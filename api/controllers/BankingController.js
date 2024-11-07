// controllers/ExampleController.js
const User = require('../models/User');
const dotenv = require('dotenv');

// Services
const contractService = require('../services/contractService');

// Configuration for environment variables
dotenv.config();

exports.getBalance = async (req, res) => {
  const { address } = req.body;

  try {
    const balance = await contractService.getBalance(address);
    res.json({ address, balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Could not fetch balance' });
  }
};

exports.getAccounts = async (req, res) => {
  console.log('selam');
  try {
    const accounts = await contractService.getAccounts(); // Fetch all users from the database
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
