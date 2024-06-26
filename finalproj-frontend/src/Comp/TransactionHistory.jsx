import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import axiosInstance from "../axiosConifg";
import { toast } from 'sonner'
import { formatCurrency } from "../utilities";

const TransactionHistory = () => {
  //use transaction id for key
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { user } = useUser()

  useEffect(() => {
    if (!user) return;
    axiosInstance.get("/transactions",
      { headers: { "x-auth-token": user._id } }
    ).then(res => {
      setTransactions(res.data.data.transactions)
    }).catch(err => {
      console.error(err)
      toast.error(`Unable to get transactions: ${err.message} /n Please contact an administrator`)
    })
  }, [user])
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
          {transactions.map((transaction, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-6 border-b"
            >
              <div className="flex flex-col items-start gap-3 py-2">
                <div>{transaction.description}</div>
              </div>
              <div className="text-1xl font-bold py-2 ">{formatCurrency(transaction.amount / 100)}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
