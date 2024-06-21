import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FiLogOut, FiUser, FiCreditCard, FiDollarSign, FiPaperclip } from 'react-icons/fi';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("loggedInUser")
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white font-agrandir">
      <main className="text-center p-6 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/load-wallet" className="text-blue-500 underline block mb-2">
            <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-black">
              <FiDollarSign className="text-4xl mb-4 mx-auto text-blue-500" />
              <h2 className="text-2xl font-semibold mb-4">Wallet Balance</h2>
            </div>
          </Link>

          <Link to="/profile-update" className="text-blue-500 underline block mb-2">
            <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-black">
              <FiUser className="text-4xl mb-4 mx-auto text-blue-500" />
              <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            </div>
          </Link>
          <Link to="/service-payment" className="text-blue-500 underline">
            <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-black">
              <FiCreditCard className="text-4xl mb-4 mx-auto text-blue-500" />
              <h2 className="text-2xl font-semibold mb-4">Service Payment</h2>
            </div>
          </Link>
          <Link to="/authentication" className="text-blue-500 underline">
            <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-black">
              <FiPaperclip className="text-4xl mb-4 mx-auto text-blue-500" />
              <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
            </div>
          </Link>
          <div onClick={() => { handleSignout() }} className="text-red-500 underline cursor-pointer">
            <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-black">
              <FiLogOut className="text-4xl mb-4 mx-auto text-red-500" />
              <h2 className="text-2xl font-semibold mb-4">Logout</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
