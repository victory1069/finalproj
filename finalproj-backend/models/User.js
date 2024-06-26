const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletBalance: { type: Number, default: 0 },
  accountNumber: { type: String, unique: true },
  pin: { type: String },
  isLoggedIn: { type: Boolean, default: true },
  isServiceProvider: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
