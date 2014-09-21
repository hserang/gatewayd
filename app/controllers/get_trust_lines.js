const gatewayd = require(__dirname+'/../../');

module.exports = function(req, res){

  gatewayd.api.getTrustLines(function(err, lines){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send({ lines: lines });
    }
  });

};
