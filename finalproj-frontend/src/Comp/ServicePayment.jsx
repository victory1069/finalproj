import React, { useCallback, useEffect, useState } from "react";
import { FiCreditCard, FiBook, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConifg";
import { useUser } from "../contexts/UserContext";
import { toast } from "sonner";

const ServicePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!user) return;
    axiosInstance
      .get("/user/listServices", { headers: { "x-auth-token": user._id } })
      .then((res) => {
        setServices(res.data.data.services);
        console.log(services);
      })
      .catch((err) => {
        toast.error(`Error getting service providers: ${err.message}`);
      });
  }, [user]);

  const handleWalletPayment = useCallback(
    async (amount, email) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user._id,
        },
      };
      const res = await axiosInstance.post(
        "/payment/transfer-to-user",
        { amount: parseFloat(amount) * 100, email },
        config
      );
      return res;
      // we depend on the user variable because we use user._id
    },
    [user]
  );

  // const handleCardPayment = useCallback(
  //   async (amount, senderEmail, recipientEmail) => {
  //     const res = await new Promise((resolve, reject) => {
  //       let handler = PaystackPop.setup({
  //         key: "pk_test_31f7956563c471afc54134f22435bff182b71bc6", // Replace with your public key
  //         email: senderEmail,
  //         amount: amount * 100,
  //         onClose: function () {
  //           toast.info("Payment Window closed.");
  //         },
  //         callback: function (response) {
  //           let message = "Payment complete! Reference: " + response.reference;
  //           axiosInstance
  //             .post("/payment/verify", { reference: response.reference })
  //             .then((res) => {
  //               setUser(res.data.user);
  //               setAmount(0);
  //               toast.success(message);
  //             })
  //             .then(async () => {
  //               await handleWalletPayment(amount, recipientEmail).then(
  //                 (res) => {
  //                   resolve(res);
  //                 }
  //               );
  //             })
  //             .catch((err) => {
  //               console.error(err);
  //               toast.error("Could not verify payment");
  //               reject(err);
  //             });
  //         },
  //       });
  //       handler.openIframe();
  //     });
  //     return res;
  //   },
  //   [handleWalletPayment]
  // );

  // const handleServicePayment = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     try {
  //       let res;
  //       if (paymentMethod === "wallet") {
  //         res = await handleWalletPayment(
  //           amount,
  //           selectedServiceProviderObject.email
  //         );
  //       } else {
  //         console.log(user.email);
  //         res = await handleCardPayment(
  //           amount,
  //           user.email,
  //           selectedServiceProviderObject.email
  //         );
  //       }
  //       console.log(res);
  //       toast.success(`Payment successful: ${res.data.data.message}`);
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Error making payment");
  //     }
  //   },
  //   [
  //     selectedServiceProviderObject,
  //     user,
  //     amount,
  //     paymentMethod,
  //     handleWalletPayment,
  //     handleCardPayment,
  //   ]
  // );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-agrandir">
      <main className="text-center p-6 w-full max-w-md bg-white bg-opacity-25 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300 transition duration-200"
          >
            <FiArrowLeft className="text-3xl" />
          </button>
          <div className="text-3xl" />
        </div>
        <form onSubmit={null} className="space-y-6">
          <div className="relative">
            <label htmlFor="amount" className="block text-white text-left mb-2">
              Amount <span></span>
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
          <div className="relative">
            <label className="block text-white text-left mb-2">
              Payment Method
            </label>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className={`flex justify-center gap-3 p-2 rounded-full focus:outline-none ${
                  paymentMethod === "wallet"
                    ? "bg-blue-300"
                    : "bg-white bg-opacity-50"
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <FiBook className="text-2xl" />
                <span> Wallet </span>
              </button>
              <button
                type="button"
                className={`flex justify-center gap-3 p-2 rounded-full focus:outline-none ${
                  paymentMethod === "card"
                    ? "bg-blue-300"
                    : "bg-white bg-opacity-50"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <FiCreditCard className="text-2xl" />
                <span> Card </span>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black bg-opacity-75 text-white p-2 rounded hover:bg-opacity-60 transition duration-200"
          >
            Make Payment
          </button>
        </form>
      </main>
    </div>
  );
};

export default ServicePayment;
