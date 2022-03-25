const path = require("path");

const HDWalletProvider = require('@truffle/hdwallet-provider');

// save private key at local, use secrets json to access.
const mnemonic = require("./secrets.json").mnemonic

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://speedy-nodes-nyc.moralis.io/c908d6e4fc7cc3c0f8b58460/eth/ropsten`),
      // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/41278c8d7dc74bd3ad8886ef7ab0a0ab`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      // gasPirce: 100000000000,
      confirmations: 0,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
