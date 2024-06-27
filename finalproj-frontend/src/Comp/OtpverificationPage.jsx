import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
  };
  // const handleVerifyOtp = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/otp/verify`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email, otp }),
  //       });

  //       const data = await response.json();
  //       if (response.ok) {
  //         console.log(data.message);
  //         // On successful OTP verification, navigate to the dashboard or home page
  //         navigate('/dashboard');
  //       } else {
  //         alert(data.error);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 font-roboto">
      <main className="text-center p-6">
        <form
          onSubmit={handleVerifyOtp}
          className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg max-w-sm mx-auto"
        >
          <h1 className="text-3xl font-semibold mb-4 text-black">Verify OTP</h1>
          <p className="mb-6 text-gray-200">Please enter the OTP sent to your registered student email</p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Verify OTP
          </button>
          <a href="/" className="block mt-3 text-white-200">Resend OTP?</a>
        </form>
      </main>
    </div>
  );
};

export default OtpVerificationPage;
