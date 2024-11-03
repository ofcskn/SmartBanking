// services/contractService.js
const {Web3} = require('web3');
const dotenv = require('dotenv');

// Environment variables configuration
dotenv.config();

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

class ContractService {
    constructor() {
        // Connect to Ethereum node
        this.web3 = new Web3("http://127.0.0.1:7545");
        this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
    }

    async getBalance(address) {
        try {
            const balance = await this.web3.eth.getBalance(address);
            // Return ETH balance
            return this.web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            throw new Error('Failed to fetch balance: ' + error.message);
        }
    }
}

const contractService = new ContractService();
module.exports = contractService;
