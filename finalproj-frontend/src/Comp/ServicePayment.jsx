import React, { useCallback, useEffect, useState } from "react";
import { FiCreditCard, FiBook, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConifg";
import { useUser } from "../contexts/UserContext";
import { toast } from "sonner";

const ServicePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [allServiceProviders, setAllServiceProviders] = useState([]);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);
  const [subServiceDropDownData, setSubServiceDropDownData] = useState(null);
  const [subServiceForPayment, setSubServiceForPayment] = useState();

  useEffect(() => {
    if (!user) return;
    axiosInstance
      .get("/user/listServices", { headers: { "x-auth-token": user._id } })
      .then((res) => {
        setAllServiceProviders(res.data.data.services);
      })
      .catch((err) => {
        toast.error(`Error getting service providers: ${err.message}`);
      });
  }, [user]);

  useEffect(() => {
    if (!selectedServiceProvider) return;
    setSubServiceDropDownData(selectedServiceProvider.services);
  }, [selectedServiceProvider]);

  const handleWalletPayment = useCallback(
    async (email, subServiceForPayment) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user._id,
        },
      };
      const res = await axiosInstance.post(
        "/payment/transfer-to-user",
        { amount: parseFloat(subServiceForPayment.amount) * 100, email, subServiceName: subServiceForPayment.serviceName, subServiceId: subServiceForPayment.serviceId },
        config
      );
      return res;
      // we depend on the user variable because we use user._id
    },
    [user]
  );

  const handleCardPayment = useCallback(
    async (senderEmail, recipientEmail, subServiceForPayment) => {
      const res = await new Promise((resolve, reject) => {
        let handler = PaystackPop.setup({
          key: "pk_test_31f7956563c471afc54134f22435bff182b71bc6", // Replace with your public key
          email: senderEmail,
          amount: subServiceForPayment.amount * 100,
          onClose: function () {
            toast.info("Payment Window closed.");
          },
          callback: function (response) {
            let message = "Payment complete! Reference: " + response.reference;
            axiosInstance
              .post("/payment/verify", { reference: response.reference })
              .then((res) => {
                setUser(res.data.user);
                toast.success(message);
              })
              .then(async () => {
                await handleWalletPayment(recipientEmail, subServiceForPayment).then(
                  (res) => {
                    resolve(res);
                  }
                );
              })
              .catch((err) => {
                console.error(err);
                toast.error("Could not verify payment");
                reject(err);
              });
          },
        });
        handler.openIframe();
      });
      return res;
    },
    [handleWalletPayment]
  );

  const handleServicePayment = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        let res;
        if (paymentMethod === "wallet") {
          res = await handleWalletPayment(selectedServiceProvider.ownerEmail, subServiceForPayment);
        } else {
          res = await handleCardPayment(
            user.email,
            selectedServiceProvider.ownerEmail,
            subServiceForPayment
          );
        }
        toast.success(`Payment successful: ${res.data.data.message}`);
      } catch (err) {
        console.error(err);
        toast.error("Error making payment");
      } finally {
        setSelectedServiceProvider(undefined);
        setSubServiceDropDownData(undefined);
        setSubServiceForPayment(undefined);
      }
    },
    [
      selectedServiceProvider,
      user,
      paymentMethod,
      handleWalletPayment,
      handleCardPayment,
      subServiceForPayment
    ]
  );

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
        <form onSubmit={handleServicePayment} className="space-y-6">
          <div className="relative">
            Click to select a service
            <select
              required
              onChange={(e) => {
                const foundService = allServiceProviders.find((s) => s.ownerId === e.target.value)
                setSelectedServiceProvider(foundService)
              }}
              value={selectedServiceProvider?.ownerId}
              name="paymentService"
              id="parentService"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300 cursor-pointer">
              <option value={undefined} className="text-black cursor-pointer">
                Select Service Provider
              </option>
              {allServiceProviders.map((service, index) => (
                <option
                  className="text-black cursor-pointer"
                  value={service.ownerId}
                  key={service.ownerName + index}
                >
                  {service.ownerName}
                </option>
              ))}
            </select>
          </div>
          {subServiceDropDownData?.length > 0 && (
            <div>
              <select
                id="service"
                className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300 cursor-pointer"
                onChange={(e) => {
                  const selected = subServiceDropDownData.find(
                    (service) => service.serviceId === e.target.value
                  );
                  setSubServiceForPayment(selected);
                }}
                value={subServiceForPayment?.serviceId}
                required
              >
                <option value={undefined} className="text-black">
                  Select Payment to make
                </option>
                {subServiceDropDownData.map((service, index) => (
                  <option
                    key={index}
                    value={service.serviceId}
                    className="text-black cursor-pointer"
                  >
                    {service.serviceName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="relative">
            <label htmlFor="amount" className="block text-white text-left mb-2">
              Amount <span></span>
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
              value={subServiceForPayment?.amount}
              readOnly
            />
          </div>
          <div className="relative">
            <label className="block text-white text-left mb-2">
              Payment Method
            </label>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className={`flex justify-center gap-3 p-2 rounded-full focus:outline-none ${paymentMethod === "wallet"
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
                className={`flex justify-center gap-3 p-2 rounded-full focus:outline-none ${paymentMethod === "card"
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
