import React, { useEffect, useState } from 'react';
import { FiCreditCard, FiBook, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConifg';
import { useUser } from '../contexts/UserContext';

const ServicePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const { user } = useUser()
  const [serviceProviders, setServiceProviders] = useState([])
  const [selectedServiceProviderId, setSelectedServiceProvider] = useState(undefined);
  const [selectedServiceProviderObject, setSelectedServiceProviderObject] = useState(undefined);

  useEffect(() => {
    if (!user) return
    axiosInstance.get('/user/serviceProviders', { headers: { "x-auth-token": user._id } }).then(res => {
      setServiceProviders(res.data.data.serviceProviders)
    }).catch(err => {
      toast.error(`Error getting service providers: ${err.message}`)
    });
  }, [user])

  useEffect(() => {
    setSelectedServiceProviderObject(serviceProviders.find(serviceProvider => serviceProvider._id === selectedServiceProviderId))
  }, [selectedServiceProviderId])

  const handleServicePayment = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user._id
      }
    };

    try {
      let res;
      if (paymentMethod === 'wallet') {
        res = await axios.post('/api/payment/pay-with-wallet', { amount }, config);
      } else {
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
            <label htmlFor="amount" className="block text-white text-left mb-2">Amount <span></span></label>
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
          <div className=''>
            <label className='flex gap-3'>
              <div>Service:</div>
              <select name="serviceProvider" className='w-40 bg-gray-800'
                required
                value={selectedServiceProviderId}
                onChange={e => setSelectedServiceProvider(e.target.value)}
              >
                <option value="">Select a service</option>
                {serviceProviders.map(serviceProvider => {
                  return <option key={serviceProvider._id + serviceProvider.name} value={serviceProvider._id}>{serviceProvider.name}</option>
                })}
              </select>
            </label>

          </div>
          <div className="relative">
            <label className="block text-white text-left mb-2">Payment Method</label>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className={`flex justify-center gap-3 p-2 rounded-full focus:outline-none ${paymentMethod === 'wallet' ? 'bg-blue-300' : 'bg-white bg-opacity-50'}`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <FiBook className="text-2xl" />
                <span> Wallet </span>
              </button>
              <button
                type="button"
                className={`flex justify-center gap-3 p-2 rounded-full focus:outline-none ${paymentMethod === 'card' ? 'bg-blue-300' : 'bg-white bg-opacity-50'}`}
                onClick={() => setPaymentMethod('card')}
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
