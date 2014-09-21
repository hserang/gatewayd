const express = require('express');
var router = new express.Router();
const requireAll = require('require-all');
const controllers = requireAll(__dirname+'/../app/controllers/');
const mapCRUD = require(__dirname+'/../lib/crud_routes.js')(controllers, router);

// CREATE, INDEX, SHOW, UPDATE, DELETE
mapCRUD('ripple_addresses');
mapCRUD('external_accounts');
mapCRUD('ripple_transactions');
mapCRUD('external_transactions');
mapCRUD('policies');
mapCRUD('users');
//mapCRUD('gateway_transactions');
//mapCRUD('bridges');
//mapCRUD('currencies');
//mapCRUD('config');
//mapCRUD('kyc_data');

// INCOMING RIPPLE PAYMENTS
router.get('/v1/payments/incoming', controllers.list_incoming_payments);
//router.post('/v1/payments/incoming/:id/clear', controllers.clearIncomingPayment);

// OUTGOING RIPPLE PAYMENTS
router.post('/v1/payments/outgoing', controllers.enqueue_outgoing_payment);
router.get('/v1/payments/outgoing', controllers.list_outgoing_payments);
router.get('/v1/payments/failed', controllers.list_failed_payments);
router.post('/v1/payments/failed/:id/retry', controllers.retry_failed_payment);

// INCOMING NON-RIPPLE PAYMENTS
router.post('/v1/deposits', controllers.record_deposit);
router.get('/v1/deposits', controllers.list_queued_deposits);

// OUTGOING NON-RIPPLE PAYMENTS
router.get('/v1/withdrawals', controllers.list_queued_withdrawals);
router.post('/v1/withdrawals/:id/clear', controllers.clear_withdrawal);

// PROCESSES
router.post('/v1/start', controllers.start_gateway);
router.get('/v1/processes', controllers.list_processes);

// RIPPLE ACCOUNTS
router.get('/v1/balances', controllers.get_balance);
router.get('/v1/liabilities', controllers.get_liabilities);
router.post('/v1/trust', controllers.set_trust_line);
router.get('/v1/trust', controllers.get_trust_lines);
router.get('/v1/trustlines/:account', controllers.list_trustlines);
router.post('/v1/wallets/hot/fund', controllers.fund_hot_wallet);
router.post('/v1/wallets/cold/refund', controllers.refund_cold_wallet);
router.post('/v1/wallets/generate', controllers.generate_wallet);

module.exports = router;

