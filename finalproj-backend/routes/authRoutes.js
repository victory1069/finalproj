const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');

const router = express.Router();

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key';

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});

// Sign Up
router.post('/signup', async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const user = new User({ email, phone, password });
    await user.save();
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();

    // Send OTP
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered. Please verify your OTP.' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();

    // Send OTP
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent to your email. Please verify your OTP.' });
  } catch (err) {
    res.status(500).json({ error: 'Error signing in' });
  }
});

module.exports = router;
