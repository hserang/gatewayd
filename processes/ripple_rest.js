const exec = require('child_process').exec;
const gatewayd = require(__dirname+'/../');
process.env.DATABASE_URL = null;
const serverPath = __dirname + '/../node_modules/ripple-rest/';
const command = 'cd '+ serverPath + ' && node server.js';

exec(command, function(err, stdout) {
  if (err) {
    gatewayd.logger.error(err);
  } else {
    gatewayd.logger.info(stdout);
  }
});

gatewayd.logger.info('Running Ripple REST on http://localhost:5990');
