var gatewayd = require(__dirname+'/../../');
var domain = gatewayd.config.get('DOMAIN');

module.exports = function(req, res) {
  res.set({ 'Content-Type': 'text/plain' });
  var rippleTxt = '';

  if (gatewayd.config.get('COLD_WALLET')) {
    rippleTxt += '[accounts]\n' + gatewayd.config.get('COLD_WALLET') + '\n\n';
  }

  if (gatewayd.config.get('HOT_WALLET') && gatewayd.config.get('HOT_WALLET').address) {
    rippleTxt += '[hotwallets]\n' + gatewayd.config.get('HOT_WALLET').address;
  }

  var currencies = gatewayd.config.get('CURRENCIES');
  if (currencies) {
    rippleTxt += '\n\n[currencies]\n';
    for (var currency in gatewayd.config.get('CURRENCIES')) {
      rippleTxt += (currency + '\n');
    }
    rippleTxt += '\n';
  }

  if (domain) {
    rippleTxt += ('[domain]\n'+domain+'\n\n');
  }

  res.send(rippleTxt);

};
