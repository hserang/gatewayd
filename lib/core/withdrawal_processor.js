var gatewayd = require(__dirname+'/../../');
var async = require('async');

function WithdrawalProcessor(incomingPayment) {
  this.incomingPayment = incomingPayment;
}

WithdrawalProcessor.prototype = {
  
  processIncomingPayment: function(callback) {
    var self = this;
    async.waterfall([
      function(callback) {
        self._getTransactionRippleAddress(callback);
      },
      function(address, callback) {
        self._createWithdrawal(address, callback);
      },
      function(rippleTransaction, callback) {
        self._finalizeRippleTransaction(callback);
      }
    ], callback);
  },

  _getTransactionRippleAddress: function(callback) {
    var self = this;
    var rippleTransaction = self.incomingPayment;
    gatewayd.data.models.rippleAddresses.find({
      where: { id: rippleTransaction.to_address_id }
    }).complete(function(error, address) {
      if (error){
        callback(error, null);
      } else if (address){
        callback(null, address);
      } else {
        callback('no address found', null);
      }
    });
  },
  
  _createWithdrawal: function(address, callback){
    var self = this;
    var rippleTransaction = self.incomingPayment;
    var amountMinusFees = rippleTransaction.to_amount * (1 - gatewayd.config.get('WITHDRAWAL_FEE'));
    gatewayd.data.models.externalTransactions.create({
      deposit: false,
      amount: amountMinusFees,
      currency: rippleTransaction.to_currency,
      status: 'queued',
      ripple_transaction_id: rippleTransaction.id,
      external_account_id: address.tag
    }).complete(function(error, withdrawal) {
      if (error) {
        gatewayd.logger.error('withdrawal:failed', error);
        callback(error, null);
      } else if (withdrawal) {
        self.externalTransactionWithdrawal = withdrawal;
        gatewayd.logger.info('withdrawal:recorded', withdrawal.toJSON());
        callback(null, withdrawal);
      } else {
        gatewayd.logger.error('withdrawal:failed', 'withdrawal not found');
        callback('withdrawal not found', null);
      }
    });
  },

  _finalizeRippleTransaction: function(callback){
    var self = this;
    self.incomingPayment.updateAttributes({
      state: 'succeeded'
    }).complete(function(error, rippleTransaction) {
      if (error) {
        gatewayd.logger.info('payments:incoming:finalize:error', error);
        callback(error, null);
      } else {
        gatewayd.logger.info('payments:incoming:finalize:success', rippleTransaction.toJSON());
        callback(null, rippleTransaction);
      }
    });
  }

};

module.exports = WithdrawalProcessor;

