import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import AuthPage from './Comp/AuthPage';
import SignupPage from './Comp/SignupPage';
import OtpVerificationPage from './Comp/OtpverificationPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav className="p-4 bg-white shadow-md">
          <Link to="/authentication" className="mr-4 text-black-500">Sign In</Link>
          <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </nav> */}
        <Routes>
          <Route exact path="/" element={<AuthPage />} />
          <Route path="/authentication" element={<AuthPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otp-verification" element={<OtpVerificationPage/>} />
          {/* <Route path="*" element={<SignupPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
