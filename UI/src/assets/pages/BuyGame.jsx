import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';

const ViewGame = () => {
  const { id } = useParams(); // Get the game ID from the route
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');

  useEffect(() => {
    // Fetch the game data by ID
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/editsgame/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}` // Adjust as necessary
          }
        });

        if (response.ok) {
          const data = await response.json();
          setGame(data);
        } else {
          const error = await response.json();
          setError(error.message);
        }
      } catch (err) {
        setError('Error fetching game details');
      }
    };

    fetchGame();
  }, [id]);

  // MetaMask connection
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        // Request accounts from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        console.error('Error connecting to MetaMask:', err);
        setError('Failed to connect to MetaMask');
      }
    } else {
      setError('MetaMask not detected. Please install MetaMask extension.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center text-white mb-10">Game Details</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {game ? (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{game.game_name}</h2>
          <p className="text-gray-300 mb-4">{game.game_description}</p>
          <p className="text-lg font-semibold mb-4">Price: ${game.game_price}</p>
          <p className="text-lg mb-4">Studio: {game.game_studio}</p>

          {account ? (
            <p className="text-green-500">Connected Account: {account}</p>
          ) : (
            <button
              onClick={connectMetaMask}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Connect to MetaMask
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-white">Loading game details...</p>
      )}
    </div>
  );
};

export default ViewGame;
