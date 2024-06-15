import React, { useState } from 'react';
import axios from '../axiosConifg';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [firstname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/auth/signup', { firstname, email, phone, password });
      console.log(res.data);
      alert('Registration successful');
      navigate('/authentication');
    } catch (err) {
      const res = await axios.post('/auth/signup', { firstname, email, phone, password });
      console.log(res.data);
      console.error(err.response.data);
      alert('Error registering user');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white font-agrandir">
      <main className="text-center p-6 w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg">
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              placeholder="Enter your firstname"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={firstname}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
          <a href="/" className="block mt-4 text-blue-500">Already have an account</a>
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
