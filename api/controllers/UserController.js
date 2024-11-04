// controllers/ExampleController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Configuration for environment variables
dotenv.config();

// Services
const contractService = require('../services/contractService');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const savedUser = await user.save(); // Save the new user
    console.log(savedUser);

    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Duplicate items' });
    } else if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      res.status(400).json({ errors });
    } else {
      console.log(err);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.API_JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Middleware to Verify Token
exports.verifyToken = async (req, res, next) => {
  const token = await req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  await jwt.verify(token, process.env.API_JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    } else {
      const user = await User.findOne({ _id: decoded.userId });
      return res.status(200).json(user);
    }
  });
};

// save wallet
exports.saveWallet = async (req, res) => {
  const { address, _id } = req.params;

  try {
    let user = await User.findOne({ _id: _id });

    if (user) {
      user.walletAddress = address;
      await user.save();
      return res
        .status(201)
        .json({ message: 'Wallet address saved successfully', user });
    }

    res.status(200).json({ message: 'Wallet address already exists', user });
  } catch (error) {
    console.error('Error saving wallet address:', error);
    res.status(500).json({ error: 'Failed to save wallet address' });
  }
};

// Function to get user balance
exports.getUserWithBalance = async (req, res) => {
  const userId = req.params._id; // Get user ID from URL params
  try {
    const user = await User.findById(userId); // Fetch user from MongoDB
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.walletAddress) {
      const balance = await contractService.getBalance(user.walletAddress); // Get balance using Web3
      return res.status(200).json({
        user,
        balance,
      });
    }
  } catch (error) {
    console.error('Error fetching user balance:', error);
    res.status(500).json({ error: 'Failed to retrieve user balance' });
  }
};
