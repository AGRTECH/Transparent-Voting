require("babel-register");
require("babel-polyfill");
require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = [
  "5c47a6e890c045a1703825c55457694d8b800cdd496d55337dfde6f7bb2a4cc3",
  "66e4d1f22c39e1383b79caf7a9c82451dedfee5210e72c27adf40a9ea4aff665",
];

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys, // Array of account private keys from .env
          `https://goerli.infura.io/v3/6513d419248741bb86712fca973c1dfb` // Url to an Ethereum Node
        );
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 5,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
