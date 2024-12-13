# Installation Guide

## Prerequisites

Ensure the following software is installed on your system:

- **Node.js**: Download from [Node.js Official Website](https://nodejs.org/).
- **Expo CLI**: Install using npm or yarn.
- **Truffle**: Install via npm for contract deployment.
- **Ganache**: For a local Ethereum blockchain.
- **MetaMask Wallet**: To interact with smart contracts. (preffered Firefox or Chrome)

---

## Installation Steps

### 1. Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/ofcskn/SmartBanking
cd SmartBanking
```

### 2. Install Dependencies

Navigate to the respective folders and install dependencies:

#### Install Expo App Dependencies:

```bash
npx install
```

### 3. Setup Environment Variables

Copy the `.env.example` file to `.env` and update the variables:

```bash
cp .env.example .env
```

Define variables such as:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_WALLETCONNECTION_ID=123...
LOCALHOST_IP=localhost
LOCALHOST_PORT=5000

BLOCKCHAIN_RPC_URL=http://localhost:7545
BLOCKCHAIN_CHAIN_ID=1337
BLOCKCHAIN_EXAMPLE_ACCOUNT_ADDRESS=0x123...
BANK_CONTRACT_ADDRESS=0x123...

MONGO_DATABASE_URL=mongodb://localhost:27017/smartBanking

JWT_SECRET=SELAM
```

### 4. Deploy Smart Contracts

Use Truffle to compile and deploy the contracts:

```bash
truffle compile
truffle migrate --network development
```

### 5. Run the Backend Server

Navigate to the API folder and start the server:

```bash
cd api
npm start
```

### 6. Start the Expo App

Navigate back to the `app` folder and start the Expo app:

```bash
cd ../app
npx expo start
```

Use the Expo Go app on your mobile device or an emulator to preview.
