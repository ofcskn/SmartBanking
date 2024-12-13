# App Documentation (Expo)

## Overview

The Expo app serves as the frontend for interacting with the Solidity smart contracts. It provides users with the ability to deposit, withdraw, and check balances using WalletConnect integration.

---

## File Structure

```plaintext
/app
├── (tabs)
│   ├── _layout.tsx       # Layout for tabs
│   ├── account.tsx       # Account for the signed user
│   ├── deposit           # Deposit ETH to th bank
│   ├── getBalance        # Get balance from the bank
│   ├── index.tsx         # The page contains backlinks
│   ├── login.tsx         # Login
│   ├── transfer.tsx      # Transfer ETH to an account
│   ├── users.tsx         # List users and create a user
│   ├── withdraw.tsx      # Withdraw ETH from the bank
├── config
│   ├── config.ts         # Configuration
├── models
│   ├── classes
│   ├── interfaces
├── _layout.tsx           # Base layout
├── +html.tsx             # Base html
├── +not-found.tsx        # Not found
├── App.tsx               # Main app page
├── crypto-polyfill.js    # webCrypto
├── ctx.tsx               # Session context

```

---

## Key Features

1. **WalletConnect Integration**
   - Enables users to connect their wallets for transactions.
2. **ETH Transactions**
   - Deposit and withdraw ETH.

---

## Running the App

1. Install dependencies:
   ```bash
   npx install
   ```
2. Start the development server:
   ```bash
   npx start
   ```
3. Use the Expo Go app or an emulator to preview the app. Use QR code or URL.
