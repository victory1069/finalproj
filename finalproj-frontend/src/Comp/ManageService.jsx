import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "../axiosConifg";
import { useUser } from "../contexts/UserContext";
import { formatCurrency } from "../utilities";

const ManageService = () => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState("");
  const [services, setServices] = useState([]);
  const [amount, setAmount] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    getAllServices();
  }, [user]);

  const getAllServices = async () => {
    try {
      const res = await axios.get("/user/userServices", {
        headers: {
          "x-auth-token": user._id,
        },
      });
      setServices(res.data.services);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceName) {
      toast.error("Please Enter Service Name");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please Enter a valid Amount");
      return;
    }
    try {
      const res = await axios.post(
        "/user/createNewService",
        { amount: parseFloat(amount), serviceName }, // Convert Naira to Kobo
        {
          headers: {
            "x-auth-token": user._id,
          },
        }
      ).data;
      toast.success("Service Created Successfully");
    } catch (err) {
      setAmount(0);
      setServiceName("");
      console.error(err);
      toast.error("Transfer Unsuccessful");
    }
  };

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

        <div className="flex flex-col gap-2 max-h-96 overflow-auto px-8 py-4 w-full">
          <div className="grid grid-cols-[0.5fr,0.5fr] text-start">
            <div className="text-xl">Service Name</div>
            <div className="text-xl">Price</div>
          </div>
          {services.map((service) => (
            <div className="grid grid-cols-[0.5fr,0.5fr] text-start">
              <div className="text-sm">{service.serviceName}</div>
              <div className="text-sm"> {formatCurrency(service.amount)}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 max-h-96 overflow-auto px-8 py-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="serviceName"
                className="block text-white text-left mb-2"
              >
                Service Name
              </label>
              <input
                type="serviceName"
                id="serviceName"
                placeholder="Enter Service Name"
                className="w-full bg-transparent border-b-2 border-white text-white p-2 focus:outline-none focus:border-blue-300"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="amount"
                className="block text-white text-left mb-2"
              >
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
              Create New Service
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ManageService;
