// routes/contractRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Define the routes
router.get('/:address/balance', UserController.getBalance); // GET /api/users/balance

module.exports = router; // Export the router
