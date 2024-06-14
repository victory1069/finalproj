import React, { useState } from 'react';
import axios from 'axios';

const ServicePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [amount, setAmount] = useState('');

  const handleServicePayment = async (e) => {
    e.preventDefault();
    // Assuming you have a token stored in localStorage
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    try {
      let res;
      if (paymentMethod === 'wallet') {
        res = await axios.post('/api/payment/pay-with-wallet', { amount }, config);
      } else {
        // Here you can add card payment details
        const cardDetails = { /* Card details here */ };
        res = await axios.post('/api/payment/pay-with-card', { cardDetails, amount }, config);
      }
      console.log(res.data);
      alert('Payment successful');
    } catch (err) {
      console.error(err.response.data);
      alert('Error making payment');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Service Payment</h1>
      <form onSubmit={handleServicePayment} className="mt-6">
        <label className="block mb-2">Amount</label>
        <input
          type="number"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <label className="block mb-2">Payment Method</label>
        <select
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="wallet">Wallet</option>
          <option value="card">Card</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default ServicePayment;
