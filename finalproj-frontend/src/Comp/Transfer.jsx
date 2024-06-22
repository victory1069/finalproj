import React, { useState } from "react";
import { FiArrowLeft, FiBook, FiCreditCard } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConifg";

const Transfer = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please Enter Recipient Email");
      return;
    }
    if (!amount) {
      alert("Please Enter Amount");
      return;
    }
    try {
      res = await axios.post("/payment/transfer-to-user", { amount, email })
        .data;
      alert("Transaction successful:", res.data.info);
    } catch (err) {
      console.error(err);
      //   alert("Error registering user");
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
            <label htmlFor="amount" className="block text-white text-left mb-2">
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
              Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
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