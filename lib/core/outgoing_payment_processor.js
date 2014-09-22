var depositCallbackJob = require(__dirname+'/../jobs/deposit_completion_callback.js');
var OutgoingPayment = require(__dirname+'/outgoing_payment.js');
const gatewayd = require(__dirname+'/../../');

function OutgoingPaymentProcessor(payment) {
  this.outgoingPayment = new OutgoingPayment(payment);
  gatewayd.logger.info('payment:outgoing:recorded', payment.toJSON());
}

OutgoingPaymentProcessor.prototype = {
  processOutgoingPayment: function(callback) {
    var self = this;
    self.outgoingPayment.processOutgoingPayment(function(error, record) {
      if (error) {
        gatewayd.logger.error('payment:outgoing:error', error);
        depositCallbackJob.perform([record.id]);
        setTimeout(callback, 2000);
      } else {
        depositCallbackJob.perform([record.id]);
        callback();
      }
    });
  }
};

module.exports = OutgoingPaymentProcessor;

