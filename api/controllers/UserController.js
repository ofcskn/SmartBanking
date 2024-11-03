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

// get balance of the user
exports.getBalance = async (req, res) => {
    const { address } = req.params;
    console.log("Address of the user is ", address);
    try {
        const balance = await contract.methods.getBalance().call({ from: address });
        res.json({ balance: web3.utils.fromWei(balance, 'ether') }); // Convert from wei
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to get user balance
exports.getUserWithBalance = async (req, res) => {
    const userId = req.params.id; // Get user ID from URL params
    try {
        const user = await User.findById(userId); // Fetch user from MongoDB
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const balance = await contractService.getBalance(user.ethAddress); // Get balance using Web3
        
        res.json({
            user,
            balance,
        });
    } catch (error) {
        console.error('Error fetching user balance:', error);
        res.status(500).json({ error: 'Failed to retrieve user balance' });
    }
}