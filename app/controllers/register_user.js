const gatewayd = require(__dirname+'/../../');

module.exports = function(req, res) {
  gatewayd.api.registerUser(req.body, function(err, user){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ user: user });
    }
  });
};
