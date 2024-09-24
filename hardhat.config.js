require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from .env

// Load environment variables from .env
const INFURA_API = process.env.INFURA_API;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "infura",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // Default Hardhat network settings
    },
    infura: {
      url: INFURA_API,  // Use Infura API from .env
      accounts: [PRIVATE_KEY]  // Use private key from .env
    },
  },
  solidity: "0.8.24",
};
