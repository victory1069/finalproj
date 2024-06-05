const express = require('express');
const User = require('../models/User');
const Otp = require('../models/Otp');
const jwt = require('jsonwebtoken');

const router = express.Router();

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key';

// Verify OTP
router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP is valid, delete it
    await Otp.deleteOne({ email, otp });

    // Generate JWT
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'OTP verified successfully', token });
  } catch (err) {
    res.status(500).json({ error: 'Error verifying OTP' });
  }
});

module.exports = router;
