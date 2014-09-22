const gatewayd = require(__dirname+'/../../../');

exports.up = function(db, callback) {
  db.runSql('CREATE UNIQUE INDEX external_account_name_unique_index ON external_accounts (user_id, name)', function(err) {
    if (err) {
      gatewayd.logger.error(err);
      callback();
    } else {
      gatewayd.logger.info('added external_account_name_unique_index');
      callback();
    }
  });
};

exports.down = function(db, callback) {
  db.runSql('REMOVE UNIQUE INDEX external_account_name_unique_index', function(err) {
    if (err) {
      gatewayd.logger.error(err);
      callback();
    } else {
      gatewayd.logger.info('removed index');
      callback();
    }
  });
};
