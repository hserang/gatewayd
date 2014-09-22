var gatewayd = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Failed Payments
*
* @returns [{RippleTransaction}]
*/

function listFailedPayments() {
  gatewayd.api.listFailedPayments(function(err, transactions){
    if (err) {
      gatewayd.logger.error('listFailedPayments:failed', err);
    } else {
      PrettyPrintTable.payments(transactions);
    }
  });
}

module.exports = listFailedPayments;
