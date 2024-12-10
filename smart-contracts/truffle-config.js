// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "YOUR_INFURA_PROJECT_ID"; // Replace with your Infura Project ID
// const mnemonic = "YOUR_MNEMONIC"; // Your wallet's mnemonic

module.exports = {
  networks: {
    // rinkeby: {
    //     provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
    //     network_id: 4, // Rinkeby's id
    //     gas: 5500000, // Gas limit
    // },
    development: {
      host: process.env.LOCALHOST_IP, // Localhost (default: none)
      port: 7545, // Ganache port (default: none)
      network_id: '5777', // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: '0.8.0', // Specify your Solidity version
    },
  },
};
