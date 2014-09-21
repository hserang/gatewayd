const gateway = require(__dirname + '/../');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')();

const rippleTxtController = require(__dirname + '/../app/controllers/ripple_txt.js');
const router = require(__dirname+'/../config/routes.js');
const passportAuth = require(__dirname + '/passport_auth.js');

process.env.DATABASE_URL = gateway.config.get('DATABASE_URL');

passport.use(passportAuth.adminBasic);

var app = express();
app.use(cors);
app.use('/', express.static(gateway.config.get('WEBAPP_PATH')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());

function adminAuth() {
  return passport.authenticate('adminBasic', { session: false });
}

if (gateway.config.get('BASIC_AUTH')) {
  app.use('/v1', adminAuth(), router);
} else {
  app.use('/v1', router);
}

app.get('/ripple.txt', rippleTxtController);

module.exports = app;

