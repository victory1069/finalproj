import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCreditCard } from "react-icons/fi";
import { toast } from "sonner";

const EnterCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount } = location.state || {};
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    // Handle payment logic here
    toast.success(
      `Amount: ${amount}, Card Number: ${cardNumber}, Expiry Date: ${expiryDate}, CVV: ${cvv}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white font-agrandir">
      <main className="text-center p-6 w-full max-w-md bg-white bg-opacity-25 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/load-wallet")}
            className="text-white hover:text-gray-300 transition duration-200"
          >
            <FiArrowLeft className="text-3xl" />
          </button>
          <h1 className="text-3xl font-bold text-white">Enter Card Details</h1>
          <div className="text-3xl" />
        </div>
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="cardNumber"
              className="block text-white text-left mb-2"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="Enter card number"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="expiryDate"
              className="block text-white text-left mb-2"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="cvv" className="block text-white text-left mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              placeholder="Enter CVV"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
          >
            Pay <FiCreditCard className="ml-2" />
          </button>
        </form>
      </main>
    </div>
  );
};

export default EnterCardDetails;
