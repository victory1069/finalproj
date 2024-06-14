import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPage from './Comp/AuthPage';
import SignupPage from './Comp/SignupPage';
import OTPVerification from './Comp/OtpVerification';
import Dashboard from './Comp/Dashboard';
import ProfileUpdate from './Comp/ProfileUpdate';
import ServicePayment from './Comp/ServicePayment';
import Sidebar from './Comp/Sidebar';

function App() {
  return (
    <Router>
      <div className="App flex">
        <Sidebar />
        <div className="flex-grow">
          <nav className="p-4 bg-white shadow-md flex justify-between">
            <div>
              <Link to="/authentication" className="mr-4 text-black-500">Sign In</Link>
              <Link to="/signup" className="mr-4 text-blue-500">Sign Up</Link>
              <Link to="/verify-otp" className="mr-4 text-green-500">Verify OTP</Link>
              <Link to="/dashboard" className="mr-4 text-purple-500">Dashboard</Link>
            </div>
            <a href="/help" className="text-blue-500">Help/Support</a>
          </nav>
          <Routes>
            <Route path="/authentication" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-update" element={<ProfileUpdate />} />
            <Route path="/service-payment" element={<ServicePayment />} />
            <Route path="/" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
