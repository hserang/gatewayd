const gatewayd = require(__dirname+'/../../');

module.exports = function(req, res){

  gatewayd.api.removeCurrency(req.params.currency, function(err, currencies){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send({ currencies: currencies });
    }
  });

};
