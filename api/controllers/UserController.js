// controllers/ExampleController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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

exports.uploadImage = async (req, res, next) => {
  const { userId } = req.body;
  try {
    //await this.verifyToken(req, res, next);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.imageUrl = req.file.originalname;
    await user.save();
    return res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: user.imageUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Middleware to Verify Token
exports.verifyToken = async (req, res, next) => {
  let { token } = req.body;
  token =
    token != null || undefined ? token : await req.headers['authorization'];
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
