import React, { useState } from 'react';
import axios from '../axiosConifg';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email: emailOrPhone, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      alert('Error logging in');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 font-agrandir">
      <main className="text-center p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSignIn} className="bg-white bg-opacity-0 p-8 rounded-lg  max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Enter your email or phone number"
            className="w-full mb-4 p-2 border-b-2 border-gray-300 rounded bg-transparent text-black focus:outline-none focus:border-blue-300"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 p-2 border-b-2 border-gray-300 rounded bg-transparent text-black focus:outline-none focus:border-blue-300"
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
          <a href="/signup" className="block mt-2 text-blue-500">Don't have  an Account yet?</a>
        </form>
      </main>
    </div>
  );
};

export default AuthPage;
