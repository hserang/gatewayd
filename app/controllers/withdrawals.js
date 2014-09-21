var gatewayd = require(__dirname+'/../../');

function index(request, response) {
  gatewayd.api.listQueuedWithdrawals(function(error, withdrawals){
    if (error) {
      response
        .status(500)
        .send({error: error});
    } else {
      response.status(200).send({ withdrawals: withdrawals });
    }
  });
}

function clear(request, response) {
  gatewayd.api.clearWithdrawal(request.params.id, function(error, withdrawal){
    if (error) {
      if (error.id === 'record not found'){
        response.send(404, {
          error: {
            field: 'id',
            message: 'not found'
          }
        });
      } else {
        response.send(500, {
          error: error
        });
      }
    } else {
      response.send(200, {
        withdrawal: withdrawal
      });
    }
  });
};

module.exports = {
  update: clear,
  index: index
}

