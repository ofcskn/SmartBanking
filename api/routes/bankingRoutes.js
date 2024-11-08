// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const BankingController = require('../controllers/BankingController');

router.post('/balance', BankingController.getBalance); // GET /api/banking/balance
router.post('/transfer', BankingController.transfer); // POST / api/banking/transfer
router.get('/accounts', BankingController.getAccounts); // GET /api/banking/accounts

// Deposit to the bank
router.post('/deposit', BankingController.deposit); // POST / api/banking/deposit

module.exports = router; // Export the router
