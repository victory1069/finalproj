import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  //use transaction id for key
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([
    {
      sender: "uwaishem@gmail.com",
      receiver: "tochieatsbeats@gmail.com",
      amount: "+300",
    },
    {
      sender: "uwaishem@gmail.com",
      receiver: "tochieatsbeats@gmail.com",
      amount: "-400",
    },
    {
      sender: "uwaishem@gmail.com",
      receiver: "tochieatsbeats@gmail.com",
      amount: "+300",
    },
    {
      sender: "uwaishem@gmail.com",
      receiver: "tochieatsbeats@gmail.com",
      amount: "-900",
    },
  ]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white font-agrandir">
      <main className="text-center w-full max-w-md bg-white bg-opacity-25 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8 p-6">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300 transition duration-200"
          >
            <FiArrowLeft className="text-3xl" />
          </button>
          <div className="text-3xl" />
        </div>

        <div className="flex flex-col gap-6 max-h-96 overflow-auto">
          {Array.from({ length: 10 }).map((transaction, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-6 border-b"
            >
              <div className="flex flex-col items-start gap-3 py-2 ">
                <div>To:</div>
                <div>From:</div>
              </div>
              <div className="text-5xl font-bold py-2 ">+300</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
