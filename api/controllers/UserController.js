// controllers/ExampleController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const contractService = require('../services/contractService');

// Configuration for environment variables
dotenv.config();

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
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.API_JWT_SECRET, {
      expiresIn: '1d',
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
