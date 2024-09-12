// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GameStore {
    struct Game {
        uint gameId;
        string gameName;
        string gameStudio;
        string gameDescription;
        uint gamePrice; // price in wei
        address payable owner;
    }

    mapping(uint => Game) public games;
    uint public gameCount;

    event GameAdded(uint gameId, string gameName, uint gamePrice, address owner);
    event GamePurchased(uint gameId, address buyer, uint price);

    // Function to add a new game
    function addGame(
        string memory _gameName,
        string memory _gameStudio,
        string memory _gameDescription,
        uint _gamePrice // Price in wei
    ) public {
        require(_gamePrice > 0, "Price must be greater than 0");

        gameCount++;
        games[gameCount] = Game(
            gameCount,
            _gameName,
            _gameStudio,
            _gameDescription,
            _gamePrice,
            payable(msg.sender) // Game owner
        );

        emit GameAdded(gameCount, _gameName, _gamePrice, msg.sender);
    }

    // Function to buy a game
    function buyGame(uint _gameId) public payable {
        Game memory _game = games[_gameId];
        require(_game.gameId > 0, "Game does not exist");
        require(msg.value >= _game.gamePrice, "Insufficient Ether sent");
        require(msg.sender != _game.owner, "Owner cannot buy their own game");

        // Transfer funds to the owner of the game
        _game.owner.transfer(msg.value);

        emit GamePurchased(_gameId, msg.sender, msg.value);
    }

    // Function to get game details
    function getGame(uint _gameId)
        public
        view
        returns (
            string memory gameName,
            string memory gameStudio,
            string memory gameDescription,
            uint gamePrice,
            address owner
        )
    {
        Game memory _game = games[_gameId];
        return (_game.gameName, _game.gameStudio, _game.gameDescription, _game.gamePrice, _game.owner);
    }
}
