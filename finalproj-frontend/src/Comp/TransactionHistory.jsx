import React, { useEffect, useState } from 'react';
import axios from '../axiosConifg';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in local storage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`/api/transactions/${userId}`);
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
        console.log(error);
        alert('Error fetching transactions ');
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white font-agrandir">
      <main className="text-center p-6 w-full max-w-2xl bg-white bg-opacity-25 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/dashboard')} className="text-white hover:text-gray-300 transition duration-200">
            <FiArrowLeft className="text-3xl" />
          </button>
          <h1 className="text-3xl font-bold text-white">Transaction History</h1>
          <div className="text-3xl" />
        </div>
        <table className="w-full bg-white rounded-lg shadow-lg text-black">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id}>
                <td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{transaction.description}</td>
                <td className="border px-4 py-2">{transaction.type}</td>
                <td className="border px-4 py-2">{transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default TransactionHistory;
