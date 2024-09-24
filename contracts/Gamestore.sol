// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GameStore {

    struct Game {
        uint gameId;
        string gameName;
        string gameStudio;
        string gameDescription;
        uint gamePrice; // price in wei
        string imageUrl;
        string category; // New category field
        address payable owner;
        bool isDeleted;
        address[] buyers; // Array to store addresses of users who bought the game
    }

    struct Transaction {
        uint gameId;
        address buyer;
        uint price;
    }

    struct User {
        string username;
        address userAddress;
        bool isRegistered;
    }

    mapping(uint => Game) public games;
    mapping(address => uint) public purchases; // Track the number of purchases per buyer
    mapping(address => Transaction[]) public userTransactions;
    mapping(address => User) public users; // Mapping to store users
    uint public gameCount;
    Transaction[] public transactions;

    address public admin; // Address of the admin

    event GameAdded(uint gameId, string gameName, uint gamePrice, address owner);
    event GamePurchased(uint gameId, address buyer, uint price);
    event GameEdited(uint gameId, string gameName, uint gamePrice);
    event GameDeleted(uint gameId);
    event UserRegistered(address userAddress, string username);

    constructor() {
        admin = msg.sender; // Set the deployer as the admin
    }

    // Modifier to restrict access to admin-only functions
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }

    // Function to add a new game with image and category (restricted to admin)
    function addGame(
        string memory _gameName,
        string memory _gameStudio,
        string memory _gameDescription,
        uint _gamePrice,
        string memory _imageUrl,
        string memory _category // New category parameter
    ) public onlyAdmin {
        require(_gamePrice > 0, "Price must be greater than 0");

        gameCount++;
        games[gameCount] = Game(
            gameCount,
            _gameName,
            _gameStudio,
            _gameDescription,
            _gamePrice,
            _imageUrl,
            _category, // Set the category
            payable(msg.sender), // Game owner
            false, // isDeleted set to false initially
            new address[](0)   // Initialize an empty array for buyers
        );

        emit GameAdded(gameCount, _gameName, _gamePrice, msg.sender);
    }

    // Function to edit game details (only by the admin)
    function editGame(
        uint _gameId,
        string memory _newGameName,
        string memory _newGameStudio,
        string memory _newGameDescription,
        uint _newGamePrice,
        string memory _newImageUrl,
        string memory _newCategory // Edit the category as well
    ) public onlyAdmin {
        Game storage _game = games[_gameId];
        require(_game.gameId > 0, "Game does not exist");
        require(!_game.isDeleted, "Game has been deleted");

        // Update the game details
        _game.gameName = _newGameName;
        _game.gameStudio = _newGameStudio;
        _game.gameDescription = _newGameDescription;
        _game.gamePrice = _newGamePrice;
        _game.imageUrl = _newImageUrl;
        _game.category = _newCategory; // Update the category

        emit GameEdited(_gameId, _newGameName, _newGamePrice);
    }

    // Function to delete a game (only by the admin)
    function deleteGame(uint _gameId) public onlyAdmin {
        Game storage _game = games[_gameId];
        require(_game.gameId > 0, "Game does not exist");
        require(!_game.isDeleted, "Game has already been deleted");

        // Mark the game as deleted
        _game.isDeleted = true;

        emit GameDeleted(_gameId);
    }

    // Function to register a new user
    function register(string memory _username) public {
        require(!users[msg.sender].isRegistered, "User is already registered");

        // Register the user
        users[msg.sender] = User({
            username: _username,
            userAddress: msg.sender,
            isRegistered: true
        });

        emit UserRegistered(msg.sender, _username);
    }

    // Function to login (in Solidity, "login" can just verify registration)
    function login() public view returns (bool) {
        require(users[msg.sender].isRegistered, "User is not registered");
        return true;
    }

    // Function to buy a game
    function buyGame(uint _gameId) public payable {
        Game storage _game = games[_gameId];
        require(_game.gameId > 0, "Game does not exist");
        require(!_game.isDeleted, "Game has been deleted");
        require(msg.value >= _game.gamePrice, "Insufficient Ether sent");
        require(msg.sender != _game.owner, "Owner cannot buy their own game");

        // Transfer funds to the owner of the game
        _game.owner.transfer(msg.value);

        // Record the transaction
        transactions.push(Transaction(_gameId, msg.sender, msg.value));
        userTransactions[msg.sender].push(Transaction(_gameId, msg.sender, msg.value));

        // Track the number of purchases by the buyer
        purchases[msg.sender]++;

        // Add the buyer's address to the game's buyers array
        _game.buyers.push(msg.sender);

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
            string memory imageUrl,
            string memory category, // Return the category
            address owner,
            address[] memory buyers // Return the list of buyers
        )
    {
        Game memory _game = games[_gameId];
        require(!_game.isDeleted, "Game has been deleted");
        return (
            _game.gameName,
            _game.gameStudio,
            _game.gameDescription,
            _game.gamePrice,
            _game.imageUrl,
            _game.category, // Include category
            _game.owner,
            _game.buyers // Return the buyers array
        );
    }

    // Function to get all games bought by a certain user
    function getUserGames(address _user) public view returns (Game[] memory) {
        uint totalPurchased = userTransactions[_user].length;
        Game[] memory purchasedGames = new Game[](totalPurchased);

        for (uint i = 0; i < totalPurchased; i++) {
            uint gameId = userTransactions[_user][i].gameId;
            purchasedGames[i] = games[gameId];
        }

        return purchasedGames;
    }

    // Function to get all games (excluding deleted ones)
    function getAllGames() public view returns (Game[] memory) {
        uint availableGamesCount = 0;
        for (uint i = 1; i <= gameCount; i++) {
            if (!games[i].isDeleted) {
                availableGamesCount++;
            }
        }

        Game[] memory _games = new Game[](availableGamesCount);
        uint currentIndex = 0;
        for (uint i = 1; i <= gameCount; i++) {
            if (!games[i].isDeleted) {
                _games[currentIndex] = games[i];
                currentIndex++;
            }
        }

        return _games;
    }

    // Function to get all transactions
    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
