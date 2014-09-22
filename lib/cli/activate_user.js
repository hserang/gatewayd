var gatewayd = require(__dirname+'/../../');

/**
* Activate User
*
* @param userId Integer
* @returns {User}
*/

function activateUser(userId) {
  gatewayd.api.activateUser(userId, function(err, user){
    if (err) {
      gatewayd.logger.error(err);
    } else {
      gatewayd.logger.info(user.toJSON());
    }
  });
}

module.exports = activateUser;
