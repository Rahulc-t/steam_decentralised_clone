import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { GameModuleGameStore } from "../../scdata/deployed_addresses.json"; // Import contract address
import { abi } from '../../scdata/GameStore.json'; // Import contract ABI

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(15); // Set number of transactions per page
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(GameModuleGameStore, abi, provider);
  
          // Fetch all transactions from the smart contract
          const transactionsFromContract = await contract.getAllTransactions();
          console.log('Raw transactions:', transactionsFromContract);
  
          // Map transactions and wait for all promises to resolve
          const formattedTransactions = await Promise.all(
            transactionsFromContract.map(async (tx) => {
              const game = await contract.getGame(tx[0]);
              return {
                gameName: game.gameName,
                userAddress: tx[1] || 'N/A',  // User Ethereum Address (String)
                gamePrice: tx[2] ? ethers.formatUnits(tx[2], 'ether') : '0',  // Price (BigInt converted to Ether)
              };
            })
          );
  
          setTransactions(formattedTransactions);
          console.log("Formatted transactions:", formattedTransactions);
        } else {
          setError('MetaMask not detected');
        }
      } catch (err) {
        setError('Error fetching transactions from the blockchain');
        console.error('Error:', err);
      }
    };
  
    fetchTransactions();
  }, []);
  
  
    

  // Get current transactions to display on the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-[#1b2838] py-12 flex flex-col items-center">
                    <a href="/admin"><button className='bg-red-400 mt-6 mb-6 p-2 rounded-lg'>Home</button></a>

      <h1 className="text-5xl font-extrabold text-white mb-12">Transactions</h1>
      
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}
      
      <div className="w-full max-w-6xl">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-gray-800 text-left">
              {/* <th className="p-4">Transaction ID</th> */}
              <th className="p-4">Game Name</th>
              <th className="p-4">Game Price</th>
              <th className="p-4">User Address</th>
              {/* <th className="p-4">Date</th> */}
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr  className="bg-gray-700 border-b border-gray-600">
                {/* <td className="p-4">{transaction.transactionId}</td> */}
                <td className="p-4">{transaction.gameName}</td>
                {console.log(transaction.gameName)}
                <td className="p-4">{transaction.gamePrice} ETH</td>
                <td className="p-4">{transaction.userAddress}</td>
                {/* <td className="p-4">{transaction.createdAt.toLocaleDateString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }).map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => paginate(idx + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === idx + 1 ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
