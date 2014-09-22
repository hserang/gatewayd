var gatewayd = require(__dirname+'/../../');

function setLastPaymentHash(hash){
  gatewayd.api.setLastPaymentHash({ hash: hash }, function(err, newlySetHash){
    if (err) {
      gatewayd.logger.error(err);
      return;
    }
    gatewayd.logger.info('set the last payment hash to', newlySetHash);
  });
}

module.exports = setLastPaymentHash;

