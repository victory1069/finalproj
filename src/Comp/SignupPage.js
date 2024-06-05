import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   // Handle sign-up logic here
  //   console.log('Signing up with', email, phone, password, confirmPassword);
  //   // On successful sign-up, navigate to OTP verification
  //   navigate('/otp-verification');
  // };
  
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        // On successful sign-up, navigate to OTP verification
        navigate('/otp-verification', { state: { email } });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-r from-blue-500 to-purple-500">
      <main className="text-center p-6">
        <form onSubmit={handleSignUp} className="bg-white p-8 rounded-lg bg-opacity-50 shadow-lg max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Your  Account</h1>
        <input
            type="text"
            placeholder="First Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your matric number"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200" 
          >
            Sign Up
          </button>
          <a href="/" className="block mt-4 text-blue-500">Already have an account?</a>
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
