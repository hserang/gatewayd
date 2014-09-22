var gatewayd = require(__dirname+'/../../');

function listCurrencies(){
  var currencies = gatewayd.config.get('CURRENCIES') || {};
  for (var _currency in currencies) {
    gatewayd.logger.info(_currency);
  }
}

module.exports = listCurrencies;
