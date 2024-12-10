// controllers/ExampleController.js
const User = require('../models/User');
const dotenv = require('dotenv');

// Services
const contractService = require('../services/contractService');

// Configuration for environment variables
dotenv.config();

exports.getBalance = async (req, res) => {
  const { publicAddress, signature } = req.body;

  try {
    const balance = await contractService.getBalance(publicAddress, signature);
    res.json({ publicAddress, balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Could not fetch balance' });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await contractService.getAccounts(); // Fetch all users from the database
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Transfer money to the other ETH address
exports.transfer = async (req, res) => {
  const { fromAddress, toAddress, amountInEth, signature } = req.body;

  try {
    const receipt = await contractService.transferEth(
      fromAddress,
      toAddress,
      amountInEth,
      signature
    );
    res.status(200).json({
      success: true,
      message: 'Transfering is successful',
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Transfering is failed.',
      error: error.message,
    });
  }
};

// Deposit ETH to the bank by walletAddress
exports.deposit = async (req, res) => {
  const { amountEth, publicAddress, signature } = req.body;

  try {
    const receipt = await contractService.deposit(
      publicAddress,
      amountEth,
      signature
    );
    res.json({ publicAddress, receipt, signature });
  } catch (error) {
    console.error('Error trying to deposit:', error);
    res.status(500).json({ error: 'Could not deposit to the bank.' });
  }
};

// withdraw ETH from the bank
exports.withdraw = async (req, res) => {
  const { amountEth, publicAddress, signature } = req.body;
  try {
    const receipt = await contractService.withdraw(
      publicAddress,
      amountEth,
      signature
    );
    res.json({ publicAddress, receipt });
  } catch (error) {
    console.error('Error trying to withdraw:', error);
    res.status(500).json({ error: 'Could not withdraw balance' });
  }
};
