// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Define the routes
router.get('/', UserController.getUsers);      // GET /api/users
router.post('/create', UserController.createUser);      // POST /api/users/create
router.get('/:address/balance', UserController.getUserWithBalance);      // GET /api/users/balance

module.exports = router; // Export the router
