const express = require('express');
const controllers = requireAll(__dirname+'/../controllers/');

var router = new express.Router();

// PRIMARY API METHODS //
router.get('/v1/payments/incoming', controllers.listIncomingPayments);
router.post('/v1/payments/outgoing', controllers.enqueueOutgoingPayment);
router.get('/v1/payments/outgoing', controllers.listOutgoingPayments);
router.get('/v1/payments/failed', controllers.listFailedPayments);
router.post('/v1/payments/failed/:id/retry', controllers.retryFailedPayment);

// CURRENCIES CRUD
router.get('/v1/currencies', controllers.listCurrencies);
router.get('/v1/currencies/:currency', controllers.showCurrency);
router.post('/v1/currencies/:currency', controllers.addCurrency);
router.put('/v1/currencies/:currency', controllers.updateCurrency);
router.delete('/v1/currencies/:currency', controllers.removeCurrency);

// CONFIG CRUD
router.get('/v1/config', configController.index);
router.get('/v1/config/:key', configController.show);
router.post('/v1/config/:key', configController.create);
router.put('/v1/config/:key', configController.update);
router.delete('/v1/config/:key', configController.destroy);

// PROPOSED PRIMARY API METHODS
router.post('/v1/payments/incoming/:id/clear', controllers.clearIncomingPayment);

// SECONDARY API METHODS //
router.get('/v1/withdrawals', controllers.listQueuedWithdrawals);
router.post('/v1/withdrawals/:id/clear', controllers.clearWithdrawal);
router.post('/v1/deposits', controllers.recordDeposit);
router.get('/v1/deposits', controllers.listQueuedDeposits);
router.get('/v1/cleared', controllers.listCleared);
router.post('/v1/registrations', controllers.registerUser);

// CONFIG API METHODS

router.post('/v1/wallets/hot/fund', controllers.fundHotWallet);
router.post('/v1/start', controllers.startGateway);
router.post('/v1/trust', controllers.setTrustLine);
router.get('/v1/trust', controllers.getTrustLines);
router.post('/v1/wallets/cold/refund', controllers.refundColdWallet);
router.get('/v1/processes', controllers.listProcesses);
router.get('/v1/balances', controllers.getAccountBalance);
router.get('/v1/liabilities', controllers.getLiabilities);
router.get('/v1/trustlines/:account', controllers.listTrustlines);
router.post('/v1/wallets/generate', controllers.generateWallet);
router.post('/v1/wallets/hot/fund', controllers.fundHotWallet);

module.exports = router;

