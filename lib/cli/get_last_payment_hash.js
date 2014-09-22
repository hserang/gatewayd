var gatewayd = require(__dirname+'/../../');

module.exports = function (){
  gatewayd.api.getLastPaymentHash(function(err, hash){
    if (err) {
      gatewayd.logger.error(err);
      return;
    }
    gatewayd.logger.info(hash);
  });
};
