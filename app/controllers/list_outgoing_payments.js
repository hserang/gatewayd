const gatewayd = require(__dirname+'/../../');

module.exports = function(req, res) {

  gatewayd.api.listOutgoingPayments(function(err, payments){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ payments: payments });
    }
  });
  
};

