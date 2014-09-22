var gatewayd = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Users
*
* @returns [{User}]
*/


function listUsers() {
  gatewayd.api.listUsers(function(err, users){
    if (err) {
      gatewayd.logger.error(err);
      return;
    }
    PrettyPrintTable.users(users);
  });
}

module.exports = listUsers;
