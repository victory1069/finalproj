const express = require("express");
const axios = require("axios");
const router = express.Router();
const {
  payWithCard,
  payWithWallet,
  transferToUser,
} = require("../controllers/paymentController");
const auth = require("../middleware/authMiddlewar");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

router.post("/pay-with-card", auth, payWithCard);
router.post("/pay-with-wallet", auth, payWithWallet);
router.post("/transfer-to-user", auth, transferToUser);

module.exports = router;

router.post("/verify", async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { amount, status, customer } = response.data.data;
    if (status !== "success") throw new Error("Transaction not successful");
    const user = await User.findOneAndUpdate(
      {
        email: customer.email,
      },
      { $inc: { walletBalance: amount } },
      {
        new: true, // Return the updated document
        runValidators: true,
      }
    );

    const transaction = new Transaction({
      amount: amount,
      isExternal: true,
      recipientEmail: customer.email,
      description: "Load Wallet",
    });
    await transaction.save();
    await user.save();
    const { password: _pass, ...publicUser } = user.toJSON();
    res.status(200).json({ transaction: response.data, user: publicUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
