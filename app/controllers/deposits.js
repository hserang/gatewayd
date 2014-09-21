const gatewayd = require(__dirname+'/../../');

function create(request, response) {

  var opts =  {
    external_account_id: request.body.external_account_id,
    amount: request.body.amount,
    currency: request.body.currency,
    data: request.body.data
  };

  if (opts.external_account_id && opts.amount && opts.currency) {
    gatewayd.api.recordDeposit(opts, function(error, deposit){
      if (err) {
        response.send(500, {error: error});
      } else {
        response.send({ deposit: deposit });
      }
    });
  } else {
    response
      .status(500)
      .send({ required: [
        'external_account_id', 
        'amount', 
        'currency'
      ]});
  }
}

function index(request, response) {

  gatewayd.api.listQueuedDeposits(function(error, deposits){
    if (error) {
      response.send(500, {error: error});
    } else {
      response.send({ deposits: deposits });
    }
  });

}

module.exports = {
  create: create,
  index: index
}

