var gatewayd = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

module.exports = function() {

  gatewayd.api.listCleared(function(err, deposits){
    if (err) {
      gatewayd.logger.error(err);
      return;
    }
    PrettyPrintTable.clearedTransactions(deposits || []);
  });
};
