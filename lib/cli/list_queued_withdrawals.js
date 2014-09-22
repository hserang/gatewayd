var gatewayd = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Withdrawals
*
* @returns [{ExternalTransaction}]
*/

function listQueuedWithdrawals(){
  gatewayd.api.listQueuedWithdrawals(function(err, withdrawals) {
    if (err) {
      gatewayd.logger.error('listQueuedWithdrawals:failed');
      return;
    }

    PrettyPrintTable.externalTransactions(withdrawals);
  });
}

module.exports = listQueuedWithdrawals;
