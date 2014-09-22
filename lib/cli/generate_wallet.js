var gatewayd = require(__dirname+'/../../');

module.exports = function() {
  gatewayd.api.generateWallet(function(error, wallet) {
    if (error) {
      throw new Error(error);
    } else {
      gatewayd.logger.info(wallet);
    }
  });
};

