var gatewayd = require(__dirname+'/../../');

module.exports = function(){
  gatewayd.api.listProcesses({ json: false }, function(err, processes){
    gatewayd.logger.info(processes);
  }); 
};
