// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const BankingController = require('../controllers/BankingController');

router.post('/balance', BankingController.getBalance); // GET /api/banking/balance
router.get('/accounts', BankingController.getAccounts); // GET /api/banking/accounts

module.exports = router; // Export the router
