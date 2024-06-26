import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConifg";
import { useUser } from "../contexts/UserContext";
import { toast } from "sonner";

const Transfer = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please Enter Recipient Email");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please Enter a valid Amount");
      return;
    }
    try {
      const res = await axios.post(
        "/payment/transfer-to-user",
        { amount: parseFloat(amount) * 100, email }, // Convert Naira to Kobo
        {
          headers: {
            "x-auth-token": user._id,
          },
        }
      ).data;
      toast.success("Transfer Successful");
    } catch (err) {
      toast.error("Transfer Unsuccessful");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white font-agrandir">
      <main className="text-center p-6 w-full max-w-md bg-white bg-opacity-25 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-white hover:text-gray-300 transition duration-200"
          >
            <FiArrowLeft className="text-3xl" />
          </button>
          <div className="text-3xl" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-white text-left mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="amount" className="block text-white text-left mb-2">
              Amount (Naira)
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount in Naira"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black bg-opacity-75 text-white p-2 rounded hover:bg-opacity-60 transition duration-200"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default Transfer;
