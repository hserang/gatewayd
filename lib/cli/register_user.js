var gatewayd = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Register a User
* - creates external account named "default"
* - creates ripple address as provided
*
* @param {string} name
* @param {string} rippleAddress 
* @param {string} password
* @returns {User}, {ExternalAccount}, {RippleAddress}
*/

function registerUser(username, password, rippleAddress){

  var opts = {
    name: username,
    password: password,
    ripple_address: rippleAddress
  };

  gatewayd.api.registerUser(opts, function(err, user) {
    if (err) {
      gatewayd.logger.info('Error reigstering user, changes rollback back');
      gatewayd.logger.error(err);
    } else {
      gatewayd.logger.info('### CREATED USER ###');
      PrettyPrintTable.users([user]);
      gatewayd.logger.info('### CREATED RIPPLE ADDRESSES ###');
      PrettyPrintTable.rippleAddresses([user.hosted_address, user.ripple_address]);
      gatewayd.logger.info('### CREATED EXTERNAL ACCOUNT ###');
      PrettyPrintTable.externalAccounts([user.external_account]);
    }
  });

}

module.exports = registerUser;

