const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const router = express.Router();
const { signup, login, getUser } = require("../controllers/authController");
const auth = require("../middleware/authMiddlewar");

// Sign Up
router.post("/signup", signup);
router.post("/login", login);
//router.get('/user', auth, getUser);

module.exports = router;
