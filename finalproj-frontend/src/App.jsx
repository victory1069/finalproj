import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AuthPage from './Comp/AuthPage';
import SignupPage from './Comp/SignupPage';
import Dashboard from './Comp/Dashboard';
import ProfileUpdate from './Comp/ProfileUpdate';
import ServicePayment from './Comp/ServicePayment';
import OtpVerificationPage from './Comp/OtpverificationPage';
import ForgotPassword from './Comp/ForgotPassword';
import LoadWallet from './Comp/LoadWallet';
import EnterCardDetails from './Comp/EnterCardDetails';
import { useNavigate } from 'react-router-dom';
import { loggedInUserGlobal } from './Comp/loggedInUser';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(function checkUserIsLoggedIn() {
    try {
      const loggedInUserString = localStorage.getItem("loggedInUser")
      const loggedInUserParsed = JSON.parse(loggedInUserString)
      if (!loggedInUserParsed) throw new Error("You're not logged in")
      loggedInUserGlobal.user = loggedInUserParsed
      navigate("/dashboard")
    } catch (e) {
      if (!location.pathname.endsWith("/") && !location.pathname.endsWith("signup"))
        navigate("/")
      console.error(e)
    }
  }, [])
  return (

    <div className="App flex">
      <div className="flex-grow">
        <Routes>
          <Route path="/authentication" element={<AuthPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<OtpVerificationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
          <Route path="/service-payment" element={<ServicePayment />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/load-wallet" element={<LoadWallet />} />
          <Route path="/enter-card-details" element={<EnterCardDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
