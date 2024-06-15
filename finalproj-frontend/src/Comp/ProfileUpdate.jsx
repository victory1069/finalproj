import React, { useState } from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
  const [pin, setPin] = useState('');

  const handleUpdateProfile = async (e) => {
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
      const res = await axios.put('/api/user/profile', { pin }, config);
      console.log(res.data);
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err.response.data);
      alert('Error updating profile');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Update Profile</h1>
      <form onSubmit={handleUpdateProfile} className="mt-6">
        <label className="block mb-2">New PIN</label>
        <input
          type="password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;

