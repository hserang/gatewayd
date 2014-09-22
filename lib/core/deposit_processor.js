var gatewayd = require(__dirname+'/../../');

function DepositProcessor(deposit) {
  this.deposit = deposit;
  gatewayd.logger.info('deposit:recorded', deposit.toJSON());
}

DepositProcessor.prototype = {
  processDeposit: function(callback) {
    var self = this;
    // Look up deposit external account record
    gatewayd.data.models.externalAccounts.find({ where: {
      id: self.deposit.external_account_id
    }}).complete(function(error, account) {
      if (error) {
        gatewayd.logger.error('deposit:failed', error);
        return callback(error, null);
      }
      // Find independent address associated with user
      gatewayd.data.models.rippleAddresses.find({ where: { 
        user_id: account.user_id,
        type: 'independent'
      }}).complete(function(error, address){
        if (error) {
          gatewayd.logger.error('deposit:failed', error);
          return callback(error, null);
        }
        // Create outgoing ripple payment transaction
        gatewayd.data.models.rippleTransactions.create({
          to_amount: self.deposit.amount * (1 - gatewayd.config.get('DEPOSIT_FEE')),
          to_currency: self.deposit.currency,
          to_issuer: gatewayd.config.get('COLD_WALLET'),
          from_amount: self.deposit.amount,
          from_currency: self.deposit.currency,
          from_issuer: gatewayd.config.get('COLD_WALLET'),
          to_address_id: address.id,
          from_address_id: gatewayd.config.get('HOT_WALLET').id,
          state: 'outgoing',
          external_transaction_id: self.deposit.id
        }).complete(function(error, payment) {
          if (error) {
            gatewayd.logger.error('deposit:failed', error);
            return callback(error, null);
          }
          // Remove original deposit record from queue
          self.outgoingPayment = payment;
          gatewayd.logger.info('outgoing:payment:queued', payment.toJSON());
          gatewayd.api.finalizeDeposit({
            id: self.deposit.id,
            ripple_transaction_id: payment.id
          }, function(error, deposit){
            if (error) {
              gatewayd.logger.error('deposit:finalize:error', error);
            } else {
              gatewayd.logger.info('deposit:finalized', deposit.toJSON());
            }
            callback(error, deposit);
          });
        });
      });
    });
  }   
};

module.exports = DepositProcessor;
