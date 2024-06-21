import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiArrowRight } from 'react-icons/fi';

const LoadWallet = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/enter-card-details', { state: { amount } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white font-agrandir">
      <main className="text-center p-6 w-full max-w-md bg-white bg-opacity-25 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-white">Load Wallet</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="amount" className="block text-white text-left mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
          >
            Next <FiArrowRight className="ml-2" />
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoadWallet;
