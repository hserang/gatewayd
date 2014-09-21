const gatewayd = require(__dirname+'/../../');

module.exports = function(req, res){
  gatewayd.api.generateWallet(function(err, wallet){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ wallet: wallet });
    }
  });


};
