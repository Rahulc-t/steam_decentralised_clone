# Game Store DApp

A decentralized application (DApp) for managing and purchasing games using Ethereum smart contracts. This project allows users to add games to a blockchain and purchase them using Ether.

## DEMO VIDEO:
[[SteamClone]](https://youtu.be/udjC9NSG5MM?si=xxPT78NRcki5UTth)

## Features

- **Add Games**: Admins can add new games to the blockchain.
- **Buy Games**: Users can purchase games from the blockchain.

## Technologies

- **React**: For the frontend.
- **Ethers.js**: For interacting with Ethereum smart contracts.
- **Ethereum**: For the blockchain.
- **Solidity**: For writing smart contracts.
- **MetaMask**: For managing Ethereum accounts.

## Prerequisites

- Node.js and npm installed
- MetaMask browser extension installed
- A local or test Ethereum network (like Ganache)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/game-store-dapp.git
   cd game-store-dapp

2. **Install Dependencies**

    ```bash
    npm install

3. **Configure Smart Contract**
    Ensure your smart contract is deployed and the contract address is updated in src/scdata/deployed_addresses.json.
    ```bash
    npm start

4. **Run the Application**
    ```bash
    npm run dev


## Usage

### Add Games

1. Navigate to the "Add Game" page.
2. Fill out the form with the following details:
   - **Game Name**: The name of the game.
   - **Game ID**: A unique identifier for the game.
   - **Game Studio**: The studio that developed the game.
   - **Game Price (in Ether)**: The price of the game in Ether.
   - **Game Description**: A brief description of the game.
3. Click on the "Add Game" button to submit the form.
4. The game will be added to the blockchain and the backend.

### Buy Games

1. Navigate to the "Buy Game" page.
2. Enter the **Game ID** of the game you want to purchase.
3. Enter the **Purchase Price (in Ether)**.
4. Click on the "Buy Game" button to complete the transaction.
5. Confirm the transaction in MetaMask.

Make sure your MetaMask wallet is connected and has enough Ether for transactions.

## Scheduled Updates

### Future Update

- **Implement Badge Distribution Using NFT Technology**
  - Add functionality for distributing badges using NFT technology.

- **Implement Category System to Sort Games**





## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



