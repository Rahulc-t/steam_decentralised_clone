import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    // Fetch all games from the server
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/getgames', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}` // Use your token mechanism
          }
        });

        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          const error = await response.json();
          setError(error.message);
        }
      } catch (err) {
        setError('Error fetching games');
      }
    };

    fetchGames();
  }, []);

  const handleBuy = (gameId) => {
    navigate(`/viewgame/${gameId}`)
    // Add your logic here to handle the game purchase
  };

  return (
    <div className="py-10 bg-gray-800">
      <h1 className="text-4xl font-bold text-center text-white mb-10">Game Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {games.map((game) => (
          <div
            key={game.game_Id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <h2 className="text-2xl font-bold mb-4">{game.game_name}</h2>
            <p className="text-gray-300 mb-4">{game.game_description}</p>
            <p className="text-lg font-semibold mb-4">Price: ${game.game_price}</p>

            <button
              onClick={() => handleBuy(game.game_Id)}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
