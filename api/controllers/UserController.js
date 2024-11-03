// controllers/ExampleController.js
const User = require('../models/User');

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
    try {
        const savedUser = await user.save(); // Save the new user
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// save wallet
exports.saveWallet = async (req, res) => {
    const { address, _id } = req.params;

    try {
        let user = await User.findOne({ _id: _id });

        if (user) {
            user.walletAddress= address;
            await user.save();
            return res.status(201).json({ message: 'Wallet address saved successfully', user });
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
        if (user.walletAddress){ 
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
}