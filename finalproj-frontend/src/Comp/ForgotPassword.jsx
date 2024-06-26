import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      console.log(res.data);
      toast.success("Password reset link sent to your email");
      navigate("/authentication");
    } catch (err) {
      console.error(err.response.data);
      toast.error("Error sending password reset link");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 text-white font-agrandir">
      <main className="text-center p-6 w-full max-w-md bg-white bg-opacity-25 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/authentication")}
            className="text-white hover:text-gray-300 transition duration-200"
          >
            <FiArrowLeft className="text-3xl" />
          </button>
          <h1 className="text-3xl  font-bold text-white">Forgot Password</h1>
          <div className="text-3xl" />
        </div>
        <form onSubmit={handleForgotPassword} className="space-y-6">
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
