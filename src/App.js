import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPage from './Comp/AuthPage';
import SignupPage from './Comp/SignupPage';
import Dashboard from './Comp/Dashboard';
import ProfileUpdate from './Comp/ProfileUpdate';
import ServicePayment from './Comp/ServicePayment';
import OtpVerificationPage from './Comp/OtpverificationPage';
import ForgotPassword from './Comp/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App flex">
        <div className="flex-grow">
          
          <Routes>
            <Route path="/authentication" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<OtpVerificationPage/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-update" element={<ProfileUpdate />} />
            <Route path="/service-payment" element={<ServicePayment />} />
            <Route path="/" element={<AuthPage />} />
            <Route path="/forgot-password" element= {<ForgotPassword/>}    />       
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
