const gatewayd = require(__dirname+'/../../');

module.exports = function(request, response){

  gatewayd.api.listIncomingPayments(function(error, payments){
    if (err) {
      response.send(500, {error: error});
    } else {
      response.send({ incoming_payments: payments });
    }
  });
  
};

