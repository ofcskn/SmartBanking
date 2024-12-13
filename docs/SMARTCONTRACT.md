# Smart Contract Documentation

## Overview

This document provides details about the Solidity contracts used in **SecureBanking**.

### Contracts

1. **SecureBanking.sol**

   - **Purpose**: Acts as a digital bank for ETH deposits, withdrawals and querying balances.
   - **Key Functions**:
     - `deposit()`: Accepts ETH deposits.
     - `withdraw(uint amount)`: Allows users to withdraw specified ETH amounts.
     - `getBalance()`: Allows users to querying balances.
   - **Deployment**:
     Run the following commands to deploy:
     ```bash
     truffle migrate
     ```

2. **Utility Libraries**
   - Includes helper functions for ETH transactions.

---

### ABI (Application Binary Interface)

Use the following ABI to interact with the contract:

```json
[
  {
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor",
    "payable": true
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
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
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
  }
]
```
