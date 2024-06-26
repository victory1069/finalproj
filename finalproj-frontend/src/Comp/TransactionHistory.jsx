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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-agrandir">
      <main className="text-center w-full max-w-md bg-white bg-opacity-25 rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-6">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300 transition duration-200"
          >
            <FiArrowLeft className="text-3xl" />
          </button>
          <div className="text-3xl" />
        </div>

        <div className="flex flex-col gap-6 max-h-96 overflow-auto">
          {transactions.length > 0 ? transactions.map((transaction, index, array) => (
            <div
              key={transaction._id + index}
              className={`flex justify-between items-center px-6 ${index !== array.length - 1 ? "border-b" : ""}`}
            >
              <div className="flex flex-col items-start gap-3 py-2">
                <div>
                  {user.email === transaction.senderEmail ? transaction.descriptionSender : transaction.descriptionRecipient}
                </div>
              </div>
              <div className="text-1xl font-bold py-2 ">{formatCurrency(transaction.amount / 100)}</div>
            </div>
          )) : <div class="flex justify-center items-center py-6 text-xl">You have no transactions right now</div>}
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
