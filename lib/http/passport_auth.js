var BasicStrategy = require('passport-http').BasicStrategy;
var gatewayd = require(__dirname + '/../../');

function verifyAdmin(username, password){
  if (username === gatewayd.config.get('KEY') ||
      password === gatewayd.config.get('KEY')) {
    return true;
  } else {
    return false;
  }
}

module.exports.adminBasic = (function(name){
  var auth = new BasicStrategy(
    function(username, password, done) {
      if (verifyAdmin(username, password)) {
        return done(null, { admin: true });
      } else {
        return done(null, false);
      }
    }
  );

  auth.name = name;
  return auth;

})('adminBasic');

module.exports.userBasic = (function(name){

  var userBasic = new BasicStrategy(
    function(username, password, done) {
      if (verifyAdmin(username, password)) {
        return done(null, { admin: true });
      } else {
        gatewayd.data.users.read({ name: username }, function (err, user) {
          gatewayd.logger.info(user);

          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (user) {
            var verified = gatewayd.data.users.verifyPassword(password, user.salt, user.password_hash);
            if (verified) {
              return done(null, user);
            } else {
              return done(null, null);
            }
          }
          return done(null, user);
        });
      }
    }
  );
  userBasic.name = name;
  return userBasic;

})('userBasic');

