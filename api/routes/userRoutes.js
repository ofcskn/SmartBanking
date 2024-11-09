// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Define the routes
router.get('/', UserController.getUsers); // GET /api/users

router.post('/create', UserController.createUser); // POST /api/users/create
router.post('/login', UserController.login); // POST /api/users/create
router.get('/verify', UserController.verifyToken);

router.get('/:_id/balance', UserController.getUserWithBalance); // GET /api/users/<:id>/balance
router.post('/saveWallet', UserController.saveWallet); // POST / api/users/saveWallet (need token)

module.exports = router; // Export the router
