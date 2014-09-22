var gatewayd = require(__dirname+'/../../');

function addCurrency(currency, amount){
  gatewayd.api.addCurrency(currency, amount, function(err, currencies){
    for (var _currency in currencies) {
      gatewayd.logger.info(_currency);
    }
  });
}

module.exports = addCurrency;
