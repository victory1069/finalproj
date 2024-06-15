import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">CUPAY</h2>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded">Dashboard</Link>
        <Link to="/profile-update" className="hover:bg-blue-700 p-2 rounded">Profile Update</Link>
        <Link to="/service-payment" className="hover:bg-blue-700 p-2 rounded">Service Payment</Link>
        <Link to="/authentication" className="hover:bg-red-700 p-2 rounded">Logout</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
