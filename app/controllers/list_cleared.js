const gatewayd = require(__dirname+'/../../');

module.exports = function(req, res) {

  gatewayd.api.listCleared(function(err, deposits){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ deposits: deposits });
    }
  });

};
