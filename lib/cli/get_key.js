var gatewayd = require(__dirname+'/../../');

function getKey(){
  gatewayd.api.getKey(function(err, key){
    if (err) {
      gatewayd.logger.error(err);
      return;
    }
    gatewayd.logger.info(key);
  });
}

module.exports = getKey;
