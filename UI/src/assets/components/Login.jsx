import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const Login = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminAddress = '0x12c3400D039242DbB7AF5c11BC9AA40718f06457'; // Admin wallet address

  // Function to connect to MetaMask or any Web3 wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);

        // Request access to the user's MetaMask wallet
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []); // Request to connect accounts

        const signer = await provider.getSigner();
        const address = await signer.getAddress(); // Get the wallet address of the connected user
        setWalletAddress(address);

        setLoading(false);
      } catch (error) {
        setError('Failed to connect wallet');
        setLoading(false);
      }
    } else {
      setError('MetaMask not detected. Please install MetaMask and try again.');
    }
  };

  // Check if user is admin or user and redirect accordingly
  const handleLogin = () => {
    if (!walletAddress) {
      setError('No wallet connected. Please connect your wallet.');
      return;
    }

    // If the connected wallet is the admin's wallet
    if (walletAddress.toLowerCase() === adminAddress.toLowerCase()) {
      navigate('/admin');
    } else {
      // If it's not the admin address, treat as a regular user
      navigate('/profile');
    }
  };

  // Deny access if wallet not connected
  // const denyAccess = () => {
  //   if (!walletAddress) {
  //     setError('Access denied. Please connect a wallet.');
  //   }
  // };

  // Automatically connect wallet on component mount if MetaMask is available
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setWalletAddress(accounts[0] || null); // Set wallet address or null if disconnected
      });
    }
  }, []);

  return (
    <div className="bg-gray-800 text-white py-8 px-10 rounded-lg w-96 mx-auto my-20">
      <h2 className="text-2xl mb-6">Sign in</h2>

      {!walletAddress ? (
        <>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={connectWallet}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Connecting Wallet...' : 'Connect Wallet'}
          </button>
        </>
      ) : (
        <>
          <p className="mb-4">Wallet Connected: {walletAddress}</p>

          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Log in
          </button>

          {walletAddress.toLowerCase() !== adminAddress.toLowerCase() && (
            <p className="mt-4 text-sm text-gray-300">You are logging in as a regular user.</p>
          )}
        </>
      )}

      {/* <div className="mt-6">
        <button
          onClick={denyAccess}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Deny Access
        </button>
      </div> */}
    </div>
  );
};

export default Login;
