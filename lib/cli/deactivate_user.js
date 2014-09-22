var gatewayd = require(__dirname+'/../../');

/**
* Deactivate User
*
* @param userId Integer
* @returns {User}
*/

function deactivateUser(userId) {
  gatewayd.api.deactivateUser(userId, function(err, user){
    if (err) {
      gatewayd.logger.error(err);
    } else {
      gatewayd.logger.info(user.toJSON());
    }
  });
}

module.exports = deactivateUser;
