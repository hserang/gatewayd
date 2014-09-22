var gatewayd = require(__dirname+'/../..');

function setHotWallet(address, secret){
  gatewayd.api.setHotWallet(address, secret, gatewayd.logger.info);
}

module.exports = setHotWallet;
