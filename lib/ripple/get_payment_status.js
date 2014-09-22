var request = require('request');
var gatewayd = require(__dirname +'/../../');
var restApiUrl = gatewayd.config.get('RIPPLE_REST_API');

/**
 *
 * @function getPaymentStatus
 * @description Calls ripple rest
 * @param url
 * @param fn
 */
module.exports = function(url, fn){

  //remove "/"
  var path = url.substr(1);
  var url = restApiUrl + path;

  request.get({url: url, json: true}, function(err,_,resp){
    gatewayd.logger.error(err, resp);
    if(err){
      fn(err, null);
    } else {
      if(resp.success) {
        fn(null, resp.payment);
      }
    }
  });
};
