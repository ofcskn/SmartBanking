// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    walletAddress: {
        type: String,
        // The wallet address is not required. If users want to connect, they can.
        required: false,
        unique: true,
    },
});

module.exports = mongoose.model('User', userSchema); // Export the model