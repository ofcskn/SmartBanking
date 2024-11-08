// services/contractService.js
const { Web3 } = require('web3');
const dotenv = require('dotenv');

// Environment variables configuration
dotenv.config();

// Smart contract details
const contractAddress = process.env.API_CONTRACT_ADDRESS;

const contractABI = [
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'constructor',
    payable: true,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Deposited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdrawn',
    type: 'event',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    stateMutability: 'payable',
    type: 'receive',
    payable: true,
  },
  {
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];

class ContractService {
  constructor() {
    // Connect to Ethereum node
    this.web3 = new Web3('http://127.0.0.1:7545');
    this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
  }

  // Get accounts
  async getAccounts() {
    let accounts;
    await this.web3.eth.getAccounts().then((acc) => {
      accounts = acc;
    });
    return accounts;
  }

  // get the balance of the user from the SecureBank.sol contract
  async getBalance(address) {
    try {
      const balance = await this.contract.methods
        .getBalance()
        .call({ from: address });
      // Return ETH balance
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      throw new Error('Failed to fetch balance: ' + error.message);
    }
  }

  // deposit
  async deposit(address, amount) {
    try {
      // Specify deposit transaction details
      const transaction = {
        from: address,
        to: contractAddress,
        value: this.web3.utils.toWei(amount.toString(), 'ether'), // Convert ETH to Wei
        gas: 3000000, // Gas limit, adjust as needed
      };

      // Call the deposit function
      const result = await this.contract.methods.deposit().send(transaction);
      console.log('Deposit is successful!', result);
      return this.getBalance(address);
    } catch (error) {
      throw new Error('Failed: ' + error.message);
    }
  }

  async withdraw(address, privateKey, amountEth) {
    try {
      const gasPrice = await this.web3.eth.getGasPrice(); // Get the current gas price
      const amountInWei = this.web3.utils.toWei(amountEth, 'ether');
      // Specify withdraw transaction details
      const transaction = {
        from: address,
        to: contractAddress,
        gas: 53264, // Increase gas limit
        gasPrice: gasPrice,
        data: this.contract.methods.withdraw(amountInWei).encodeABI(), // Encoded ABI for withdraw function
      };

      // Ensure the contract has enough balance
      const contractBalance = await this.web3.eth.getBalance(contractAddress);
      if (parseInt(contractBalance) < parseInt(amountInWei)) {
        return res.status(400).json({ error: 'Insufficient contract balance' });
      }

      // Sign the transaction with the private key
      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        transaction,
        privateKey
      );

      // Send the signed transaction
      const result = await this.web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );

      console.log('Withdraw is successful!', result);
      return this.getBalance(address);
    } catch (error) {
      throw new Error('Failed: ' + error.message);
    }
  }

  // transfer
  async transferWei(
    senderAddress,
    recipientAddress,
    amountInWei,
    senderPrivateKey
  ) {
    try {
      // Create the transaction object
      const transaction = {
        to: recipientAddress,
        value: amountInWei,
        gas: 21000, // standard gas limit for ether transfer
        gasPrice: await this.web3.eth.getGasPrice(),
      };

      // Get the nonce
      transaction.nonce = await this.web3.eth.getTransactionCount(
        senderAddress,
        'latest'
      );

      // Sign the transaction
      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        transaction,
        senderPrivateKey
      );

      // Send the signed transaction
      const receipt = await this.web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
      console.log('Transaction successful with hash:', receipt.transactionHash);
      return receipt;
    } catch (error) {
      console.error('Error while sending transaction:', error);
      throw error;
    }
  }
}

const contractService = new ContractService();
module.exports = contractService;
