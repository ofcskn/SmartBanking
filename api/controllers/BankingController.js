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

// Example Node.js endpoint
exports.deposit = async (req, res) => {
  const { userId, toAddress, amountInWei, senderPrivateKey } = req.body;

  try {
    const user = await User.findById(userId);
    console.log(amountInWei);
    const receipt = await contractService.depositWei(
      user.walletAddress,
      toAddress,
      amountInWei,
      senderPrivateKey
    );
    console.log('Receipt: ', receipt);
    res.status(200).json({
      success: true,
      message: 'Deposit successful',
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Deposit failed',
      error: error.message,
    });
  }
};
