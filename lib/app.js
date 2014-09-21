const gateway = require(__dirname + '/../');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')();

const publicCtrl = require(__dirname + '/http/controllers/public');
const resourcesRouter = require(__dirname+'/http/routers/resources_router.js');
const apiRouter = require(__dirname+'/http/routers/api_router.js');
const passportAuth = require(__dirname + '/http/passport_auth');

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
  app.use('/v1', adminAuth(), resourcesRouter);
  app.use('/v1', adminAuth(), apiRouter);
} else {
  app.use('/v1', resourcesRouter);
  app.use('/v1', apiRouter);
}

app.get('/ripple.txt', publicCtrl.rippleTxt);

module.exports = app;

