var gatewayd = require(__dirname+'/../../');

function setKey(){
  gatewayd.api.setKey(function(err, newKey){
    if (err){
      gatewayd.logger.error(err);
    } else {
      gatewayd.logger.info('set key to', newKey);
    } 
  });
}

module.exports = setKey;
