var gatewayd = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Retry Failed Payment
*
* @param rippleTransactionId Integer
* @returns {RippleTransaction}
*/

function retryFailedPayment(rippleTransactionId) {
  gatewayd.logger.info('in retry failed payment');
  gatewayd.api.retryFailedPayment(rippleTransactionId, function(err, transaction){
    gatewayd.logger.info('called retry failed payment api call.');
    if (err) {
      gatewayd.logger.error(err);
    } else {
      PrettyPrintTable.payments([transaction]);
    }
  });
}

module.exports = retryFailedPayment;
