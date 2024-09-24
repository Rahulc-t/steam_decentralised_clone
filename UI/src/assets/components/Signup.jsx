import React, { useState } from 'react';
import { ethers } from 'ethers';
import {abi }from '../../scdata/GameStore.json'; // Ensure ABI is correct
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const navigate=useNavigate()
    const contractAddress = "0x79fb1c691fD75AaDEF25FecC55558772F7E7A204";
    const [formData, setFormData] = useState({ username: '' });
    const [walletAddress, setWalletAddress] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    // Function to handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to connect wallet (MetaMask)
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
                setError(null);
                console.log('Wallet connected:', address); // Log wallet address
            } catch (error) {
                setError('Failed to connect wallet.');
                console.error('Wallet connection error:', error);
            }
        } else {
            setError('MetaMask not detected. Please install MetaMask.');
        }
    };

    // Function to register user by interacting with the contract
    const registerUser = async () => {
        if (!walletAddress) {
            setError('Please connect your wallet.');
            return;
        }

        if (!formData.username) {
            setError('Please enter a username.');
            return;
        }

        setLoading(true);

        try {
            // Debugging logs
            console.log('Contract Address:', contractAddress);
            console.log('ABI:', abi);

            // Set up Ethers.js contract interaction
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            console.log('Signer:', signer);  // Log signer details

            const network = await provider.getNetwork();
            // console.log('Connected Network Chain ID:', network.chainId);  // Log network ID

            const contract = new ethers.Contract(contractAddress, abi, signer);
            console.log('Contract:', contract);  // Log contract instance

            // Call the register function from the contract
            const tx = await contract.register(formData.username);
            await tx.wait(); // Wait for the transaction to be mined

            setSuccess('Account registered successfully!');
            navigate("/")
            setError(null);
        } catch (error) {
            setError('Error occurred during registration. Check console for details.');
            console.error('Contract interaction error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    registerUser();
                }}
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white"
            >
                <h2 className="text-2xl font-bold mb-6">Register with Your Wallet</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                {/* Username Field */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                {/* Wallet Address */}
                <div className="mb-4">
                    {walletAddress ? (
                        <p className="text-sm mb-2">Wallet Connected: {walletAddress}</p>
                    ) : (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Signup;
