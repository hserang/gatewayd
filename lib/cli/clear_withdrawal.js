var gatewayd = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Clear Withdrawal
* @param {integer} id
* @returns [{ExternalTransaction}]
*/

function clearWithdrawal(id){
  gatewayd.api.clearWithdrawal(id, function(err, withdrawal) {
    if (err) {
      gatewayd.logger.error('failed');
      return;
    }
    PrettyPrintTable.externalTransactions([withdrawal]);
  });
}

module.exports = clearWithdrawal;
