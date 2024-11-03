const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const dotenv = require('dotenv');
const {Web3} = require('web3');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

// Connect to Ethereum node
const web3 = new Web3("http://127.0.0.1:7545");

// Smart contract details
const contractAddress = process.env.API_CONTRACT_ADDRESS; 
const contractABI = [{
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }];

const contract = new web3.eth.Contract(contractABI, contractAddress);

dotenv.config();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // This will allow all origins


// Connect to MongoDB (update the connection string as needed)
mongoose.connect(process.env.API_CONNECTION_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the user routes
app.use('/api/users', userRoutes); // All user routes will be prefixed with /api/users

// Get balance endpoint
app.get('/balance/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const balance = await contract.methods.getBalance().call({ from: address });
        res.json({ balance: web3.utils.fromWei(balance, 'ether') }); // Convert from wei
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
