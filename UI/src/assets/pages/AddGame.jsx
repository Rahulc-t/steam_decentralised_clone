import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGame = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        game_name: '',
        game_Id: '',
        game_studio: '',
        game_price: '',
        game_description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/admin/addgame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Game added successfully');
                setFormData({
                    game_name: '',
                    game_Id: '',
                    game_studio: '',
                    game_price: '',
                    game_description: ''
                });
                navigate("/admin");
            } else {
                const error = await response.json();
                alert(`Error adding game: ${error.message}`);
            }
        } catch (err) {
            alert('Error adding game');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white"
            >
                <h2 className="text-2xl font-bold mb-6">Add Game</h2>

                <div className="mb-4">
                    <label htmlFor="game_name" className="block text-sm mb-2">
                        Game Name
                    </label>
                    <input
                        type="text"
                        id="game_name"
                        name="game_name"
                        value={formData.game_name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="game_Id" className="block text-sm mb-2">
                        Game ID
                    </label>
                    <input
                        type="text"
                        id="game_Id"
                        name="game_Id"
                        value={formData.game_Id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="game_studio" className="block text-sm mb-2">
                        Game Studio
                    </label>
                    <input
                        type="text"
                        id="game_studio"
                        name="game_studio"
                        value={formData.game_studio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="game_price" className="block text-sm mb-2">
                        Game Price
                    </label>
                    <input
                        type="text"
                        id="game_price"
                        name="game_price"
                        value={formData.game_price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="game_description" className="block text-sm mb-2">
                        Game Description
                    </label>
                    <textarea
                        id="game_description"
                        name="game_description"
                        value={formData.game_description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Add Game
                </button>
            </form>
        </div>
    );
};

export default AddGame;
