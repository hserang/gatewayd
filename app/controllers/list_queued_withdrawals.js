const gatewayd = require(__dirname+'/../../');

module.exports = function(req, res) {

  gatewayd.api.listQueuedWithdrawals(function(err, withdrawals){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ withdrawals: withdrawals });
    }
  });
  
};

