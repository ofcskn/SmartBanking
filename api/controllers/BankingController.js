// controllers/ExampleController.js
const User = require('../models/User');
const dotenv = require('dotenv');

// Services
const contractService = require('../services/contractService');

// Configuration for environment variables
dotenv.config();

exports.getBalance = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    const address = user.walletAddress;
    console.log(address);
    const balance = await contractService.getBalance(address);
    res.json({ address, balance });
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
  const { userId, toAddress, amountInWei, senderPrivateKey } = req.body;

  try {
    const user = await User.findById(userId);
    const receipt = await contractService.transferWei(
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

// Deposit ETH to the bank by walletAddress
exports.deposit = async (req, res) => {
  const { amountEth, publicAddress, signature } = req.body;

  try {
    const balance = await contractService.deposit(
      publicAddress,
      amountEth,
      signature
    );
    res.json({ publicAddress, balance, signature });
  } catch (error) {
    console.error('Error trying to deposit:', error);
    res.status(500).json({ error: 'Could not deposit to the bank.' });
  }
};

// withdraw ETH from the bank
exports.withdraw = async (req, res) => {
  const { userId, privateKey, amountEth } = req.body;

  try {
    const user = await User.findById(userId);
    const userAddress = user.walletAddress;
    const balance = await contractService.withdraw(
      userAddress,
      privateKey,
      amountEth
    );
    res.json({ userAddress, balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Could not fetch balance' });
  }
};
