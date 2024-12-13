# Troubleshooting Guide

## Common Issues and Solutions

### 1. **Ganache Not Running**

**Problem**: The contracts fail to deploy.
**Solution**: Ensure Ganache is running on port 7545.

- Install or update 'ganache-cli':
  ```bash
  npx install ganache-cli
  ```
- Ensure Ganache is running on port 7545
  ```bash
    npx ganache-cli -p 7545
  ```

---

### 2. **Metamask Connection Issues**

**Problem**: MetaMask fails to connect to the local network.
**Solution**:

- Check that MetaMask is set to the correct RPC URL (`http://localhost:7545`).
- Reset MetaMask account by going to `Settings > Advanced > Reset Account`.

---

### 3. **Expo App Crashes on Start**

**Problem**: The app crashes or fails to load.
**Solution**:

- Check the logs for errors using:
  ```bash
  npx start
  ```
- Reinstall dependencies:
  ```bash
  npx install
  ```
- Clear Expo cache:
  ```bash
  npx expo start -c
  ```

---

### 4. **Smart Contract Deployment Fails**

**Problem**: Deployment errors during `truffle migrate`.
**Solution**:

- Ensure `truffle-config.js` is correctly configured for the local network.
- Check the Solidity compiler version and update if necessary.
  ```bash
  npm install -g truffle@latest
  ```

---

### 5. **API Fails to Start**

**Problem**: Backend server does not start.
**Solution**:

- Verify that port 5000 is free:
  ```bash
  lsof -i:5000
  ```
- Check `.env` configuration.
- Restart the server:

  ```bash
  npm start

  ```
