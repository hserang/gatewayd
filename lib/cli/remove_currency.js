var gatewayd = require(__dirname+'/../../');

function removeCurrency(currency){

  gatewayd.api.removeCurrency(currency, function(err, currencies){
    for (var _currency in currencies) {
      gatewayd.logger.info(_currency);
    }
  });
}

module.exports = removeCurrency;
