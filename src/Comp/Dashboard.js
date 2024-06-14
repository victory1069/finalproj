import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-6">
        <p className="mb-4">Wallet Balance: $1000</p>
        <Link to="/profile-update" className="block mb-2 text-blue-500">Update Profile</Link>
        <Link to="/service-payment" className="block mb-2 text-blue-500">Service Payment</Link>
        <Link to="/authentication" className="block text-red-500">Logout</Link>
      </div>
    </div>
  );
};

export default Dashboard;
