import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; // ethers.js v6 for interacting with the blockchain
import avatar from '../images/avatar.jpg'; // Ensure this image exists in your directory
import GameStoreABI from '../../scdata/GameStore.json'; // Import the ABI of your GameStore contract

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    address: '', // Optionally fetch name if available
    email: '', // Optionally fetch email if available
    badges: 0,
  });
  const [games, setGames] = useState([]); // Store purchased games
  const [loading, setLoading] = useState(true);

  const contractAddress = "0x79fb1c691fD75AaDEF25FecC55558772F7E7A204"; // Add your deployed contract address

  // Function to fetch user details and purchased games from the contract
  const fetchUserDetailsAndGames = async () => {
    try {
      // Initialize the provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider in ethers v6
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, GameStoreABI.abi, signer);

      // Get the connected user's address
      const userAddress = await signer.getAddress();

      // Fetch the user's profile (username)
      const user = await contract.users(userAddress);
      const username = user.username;

      // Fetch all games bought by the user
      const userGames = await contract.getUserGames(userAddress);

      // Format games data (you can format this as needed)
      const formattedGames = userGames.map(game => ({
        gameId: game.gameId,
        gameName: game.gameName,
        gamePrice: ethers.formatEther(game.gamePrice), // Format price from wei to ETH
        imageUrl: game.imageUrl,
        transactionId: 'N/A' // Replace this with actual transaction data if needed
      }));

      // Set the user details and games in state
      setUserDetails({
        ...userDetails,
        username,
        address:userAddress,
        badges: userGames.length, // Example: Use the number of games bought as badges
      });
      setGames(formattedGames);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data from contract', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetailsAndGames();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* User Details Section */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-8">
        <div className="flex items-center">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-700"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{userDetails.username || 'Username'}</h1>
            <p className="text-gray-500 mt-2">Ethereum Address: {userDetails.address || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* My Games Section */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">My Games</h2>
        <div className="flex flex-col space-y-4"> {/* Stacked games vertically */}
          {games.length > 0 ? (
            games.map((game, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                <div className="flex items-center">
                  <img
                    src={game.imageUrl || "https://via.placeholder.com/80"} // Display actual game image
                    alt={game.gameName}
                    className="w-16 h-16 rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold">{game.gameName}</h3>
                    <p className="text-sm text-gray-400">Price: {game.gamePrice} ETH</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No games found.</p>
          )}
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Badges</h2>
        <div className="flex space-x-4">
          <div className="bg-gray-700 p-4 rounded-md text-center">
            <p className="text-2xl font-bold">{userDetails.badges || 0}</p>
            <p className="text-sm text-gray-400">Badges</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md text-center">
            <p className="text-2xl font-bold">{games.length}</p>
            <p className="text-sm text-gray-400">Games</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
