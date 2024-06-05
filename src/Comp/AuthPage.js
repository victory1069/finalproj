import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const handleSignIn = (e) => {
  //   e.preventDefault();
  //   // Handle sign-in logic here
  //   console.log('Signing in with', emailOrPhone, password);
  // };
  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = emailOrPhone; // assuming the email or phone input is for the email

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        // On successful sign-in, navigate to OTP verification
        navigate('/otp-verification', { state: { email } });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 font-roboto">
      <main className="text-center p-6">
        <h1 className="text-3xl font-semibold mb-4 text-white">Welcome to CUPAY!</h1>
        <p className="mb-6 text-gray-200">Secure and easy access to your funds.</p>
        <form onSubmit={handleSignIn} className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg max-w-sm mx-auto">
          <h2 className="text-xl font-medium mb-4">Sign In to Your Account</h2>
          <input
            type="text"
            placeholder="Enter your student email or Matric Number"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 p-2 border-bottom border-bottom-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
          <a href="/forgot-password" className="block mt-4 text-blue-500">Forgot Password?</a>
          <a href="/signup" className="block mt-4 text-blue-500">Don't Have an Account</a>
        </form>
      </main>
    </div>
  );
};

export default AuthPage;
