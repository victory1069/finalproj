import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import AuthPage from "./Comp/AuthPage";
import SignupPage from "./Comp/SignupPage";
import Dashboard from "./Comp/Dashboard";
import ProfileUpdate from "./Comp/ProfileUpdate";
import ServicePayment from "./Comp/ServicePayment";
import OtpVerificationPage from "./Comp/OtpverificationPage";
import ForgotPassword from "./Comp/ForgotPassword";
import Wallet from "./Comp/Wallet";
import EnterCardDetails from "./Comp/EnterCardDetails";
import { useNavigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import axiosInstance from "./axiosConifg";
import Transfer from "./Comp/Transfer";
import TransactionHistory from "./Comp/TransactionHistory";
import ManageService from "./Comp/ManageService";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();
  useEffect(function checkUserIsLoggedIn() {
    try {
      const loggedInUserString = localStorage.getItem("loggedInUser");
      const loggedInUserParsed = JSON.parse(loggedInUserString);
      if (!loggedInUserParsed) throw new Error("You're not logged in");
      setUser(loggedInUserParsed);
      axiosInstance
        .get(`/user`, {
          headers: {
            "x-auth-token": loggedInUserParsed._id,
          },
        })
        .then((res) => {
          localStorage.setItem("loggedInUser", JSON.stringify(res.data));
          setUser(res.data);
        });
      if (location.pathname === "/") navigate("/dashboard");
    } catch (e) {
      // don't navigate on sign in or signup pages
      if (
        !location.pathname.endsWith("/") &&
        !location.pathname.endsWith("signup")
      )
        navigate("/");
      console.error(e);
    }
  }, []);
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
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/enter-card-details" element={<EnterCardDetails />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/manage-service" element={<ManageService />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
