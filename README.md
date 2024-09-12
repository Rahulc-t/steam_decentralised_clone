Game Store DApp
A decentralized application (DApp) for managing and purchasing games using Ethereum smart contracts. This project allows users to add games to a blockchain and purchase them using Ether.

Features
Add Games: Admins can add new games to the blockchain.
Buy Games: Users can purchase games from the blockchain.
Technologies
React: For the frontend.
Ethers.js: For interacting with Ethereum smart contracts.
Ethereum: For the blockchain.
Solidity: For writing smart contracts.
MetaMask: For managing Ethereum accounts.
Prerequisites
Node.js and npm installed
MetaMask browser extension installed
A local or test Ethereum network (like Ganache)
Setup
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/game-store-dapp.git
cd game-store-dapp
Install Dependencies

bash
Copy code
npm install
Configure Smart Contract

Ensure your smart contract is deployed and the contract address is updated in src/scdata/deployed_addresses.json.
Run the Application

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000.

Usage
Add Games

Navigate to the "Add Game" page.
Fill out the form with game details and submit.
The game will be added to the blockchain and the backend.
Buy Games

Navigate to the "Buy Game" page.
Enter the game ID and purchase price.
Complete the transaction using MetaMask.
Smart Contracts
The smart contract code is located in the contracts directory. Make sure to deploy the contract and update the contract address in src/scdata/deployed_addresses.json.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or fixes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

