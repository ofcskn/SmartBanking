// services/contractService.js
const { Web3 } = require('web3');
const dotenv = require('dotenv');
const { ethers } = require('ethers');

// Environment variables configuration
dotenv.config();

// Smart contract details
const contractAddress = process.env.API_CONTRACT_ADDRESS;
const blockchainServerIp = process.env.BLOCKCHAIN_SERVER_IP;

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
    this.web3 = new Web3(blockchainServerIp);
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
  async getBalance(publicAddress, signature) {
    try {
      const message = `Get your balance that is in The Secure Bank!`;
      const recoveredAddress = this.web3.eth.accounts.recover(
        message,
        signature
      );

      // Ensure the recovered address matches the sender's address
      if (recoveredAddress.toLowerCase() !== publicAddress.toLowerCase()) {
        return res.status(400).send({ error: 'Signature verification failed' });
      }

      const balance = await this.contract.methods
        .getBalance()
        .call({ from: publicAddress });
      // Return ETH balance
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      throw new Error('Failed to fetch balance: ' + error.message);
    }
  }

  // deposit
  async deposit(publicAddress, amountInEther, signature) {
    try {
      // Specify deposit transaction details
      const transaction = {
        from: publicAddress,
        to: contractAddress,
        value: this.web3.utils.toWei(amountInEther.toString(), 'ether'), // Convert ETH to Wei
        //data: this.contract.methods.deposit().encodeABI(),
      };

      const message = `${publicAddress} is depositing ${amountInEther} ETH to The Secure Bank!`;
      const recoveredAddress = this.web3.eth.accounts.recover(
        message,
        signature
      );

      // Ensure the recovered address matches the sender's address
      if (recoveredAddress.toLowerCase() !== publicAddress.toLowerCase()) {
        return res.status(400).send({ error: 'Signature verification failed' });
      }

      // Proceed to interact with the smart contract
      const receipt = await this.contract.methods.deposit().send(transaction);
      return 'success';
    } catch (error) {
      throw new Error('Failed: ' + error.message);
    }
  }

  async withdraw(publicAddress, amountInEther, signature) {
    try {
      const amountInWei = this.web3.utils.toWei(amountInEther, 'ether');
      // Specify withdraw transaction details
      const transaction = {
        from: publicAddress,
        to: contractAddress,
        data: this.contract.methods.withdraw(amountInWei).encodeABI(), // Encoded ABI for withdraw function
      };
      const message = `${publicAddress} is withdrawing ${amountInEther} ETH from The Secure Bank!`;
      const recoveredAddress = this.web3.eth.accounts.recover(
        message,
        signature
      );
      // Ensure the recovered address matches the sender's address
      if (recoveredAddress.toLowerCase() !== publicAddress.toLowerCase()) {
        return res.status(400).send({ error: 'Signature verification failed' });
      }

      const receipt = await this.contract.methods
        .withdraw(amountInWei)
        .send(transaction);
      return 'success';
    } catch (error) {
      throw new Error('Failed: ' + error.message);
    }
  }

  // transfer
  async transferEth(fromAddress, toAddress, amountInEther, signature) {
    try {
      const amountInWei = this.web3.utils.toWei(amountInEther, 'ether');
      console.log(amountInWei);
      // Create the transaction object
      const transaction = {
        from: fromAddress,
        to: toAddress,
        value: amountInWei,
      };

      const message = `${fromAddress} is transfering ${amountInEther} ETH to ${toAddress}!`;
      const recoveredAddress = this.web3.eth.accounts.recover(
        message,
        signature
      );

      // Ensure the recovered address matches the sender's address
      if (recoveredAddress.toLowerCase() !== fromAddress.toLowerCase()) {
        return res.status(400).send({ error: 'Signature verification failed' });
      }

      // Get the nonce
      transaction.nonce = await this.web3.eth.getTransactionCount(
        fromAddress,
        'latest'
      );

      // Send the signed transaction
      const receipt = await this.web3.eth.sendTransaction(transaction);
      console.log('Transaction successful with hash:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error while sending transaction:', error);
      throw error;
    }
  }
}

const contractService = new ContractService();
module.exports = contractService;
