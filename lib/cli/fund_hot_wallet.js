var RippleRestClient = require('ripple-rest-client');
var PrettyPrintTable = require(__dirname+'/../views/text/');
var gatewayd = require(__dirname+'/../../');
var async = require('async');

var rippleRestClient = new RippleRestClient({
  account: gatewayd.config.get('HOT_WALLET').address
});

function fundHotWallet(amount, currency, secret, callback) {
  var options = {
    amount: amount,
    currency: currency,
    secret: secret
  };

  async.waterfall([
    function(next){
      gatewayd.api.fundHotWallet(options, next);
    },
    function(next){
      rippleRestClient.getAccountBalance(function(error, balances) {
        if (error) {
          return callback(error, null)
        } else {
          PrettyPrintTable.balances(balances.balances);
        }
      });
    }
  ], callback);

}

module.exports = fundHotWallet;
