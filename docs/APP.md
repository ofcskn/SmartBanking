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

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
