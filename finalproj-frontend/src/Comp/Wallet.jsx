import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiArrowRight } from 'react-icons/fi';
import { useUser } from '../contexts/UserContext';
import axiosInstance from '../axiosConifg';

const Wallet = () => {
    const { user } = useUser()
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let handler = PaystackPop.setup({
            key: 'pk_test_31f7956563c471afc54134f22435bff182b71bc6', // Replace with your public key
            email: user.email,
            amount: amount * 100,
            onClose: function () {
                alert('Payment Window closed.');
            },
            callback: function (response) {
                let message = 'Payment complete! Reference: ' + response.reference;
                alert("done")
                axiosInstance.post('/payment/verify', { reference: response.reference }).then((res => {
                    console.log(res)
                    alert(message);
                })).catch(err => {
                    console.error(err)
                    console.alert("Could not verify payment")
                })
            }
        });

        handler.openIframe();
        // navigate('/enter-card-details', { state: { amount } });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white font-agrandir">
            {
                user
                && <main className="text-center p-6 w-full max-w-md bg-white bg-opacity-25 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-8 text-white">Wallet - {user.name}</h1>
                    <div className="text-left">Wallet address (email): <span className='text-black'>{user.email}</span></div>
                    <div className="text-left">Current Balance: <span className='text-black'><span className='line-through'>N</span>{(user.walletBalance / 100).toFixed(2)} </span></div>

                    <form onSubmit={handleSubmit} id="paymentForm" className="mt-10 mb-10 space-y-6">
                        <div className="relative">
                            <label htmlFor="amount" className="block text-white text-left mb-2">Load Wallet</label>
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
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                        >
                            Next <FiArrowRight className="ml-2" />
                        </button>
                    </form>
                </main>}
        </div>
    );
};

export default Wallet;
