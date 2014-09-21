const gatewayd = require(__dirname+'/../../');

module.exports = function(req, res){
  res.send({ 'CURRENCIES': gatewayd.config.get('CURRENCIES') });
};
