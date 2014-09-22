var gatewayd = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Add External Account
*
* @param name
* @param userId
* @returns [{ExternalAccount}]
*/


function addExternalAccount(name, userId) {
  gatewayd.data.externalAccounts.create({ name: name, user_id: userId }, function(err, account){
    if (err) {
      gatewayd.logger.error(err);
    } else {
      PrettyPrintTable.externalAccounts([account]);
    }
  });
}

module.exports = addExternalAccount;
