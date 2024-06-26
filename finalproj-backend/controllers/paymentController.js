const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { formatCurrency } = require("../utilities");

exports.payWithCard = async (req, res) => {
  const { cardDetails, amount } = req.body;

  // Integrate with a payment gateway here, e.g., Stripe
  // Assuming payment is successful:
  res.json({ msg: "Payment successful", amount });
};

exports.payWithWallet = async (req, res) => {
  const { amount } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (user.walletBalance < amount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    user.walletBalance -= amount;
    await user.save();

    res.json({ msg: "Payment successful", amount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.transferToUser = async (req, res) => {
  const { amount, email: recipientEmail } = req.body;

  try {
    const user = await User.findById(req.userId);
    const recipient = await User.findOne({ email: recipientEmail });

    if (!user) {
      return res.status(404).json({ msg: `User not found` });
    }

    if (!recipient) {
      return res.status(404).json({ msg: `Recipient not found` });
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    if (user.walletBalance < transferAmount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    user.walletBalance -= transferAmount;
    recipient.walletBalance += transferAmount;

    await user.save();
    await recipient.save();
    const transaction = new Transaction({
      amount: transferAmount,
      description: recipient.isServiceProvider
        ? `Payment to ${recipient.name}`
        : `Transfer to ${recipientEmail}`,
      recipientEmail,
      isExternal: false,
      senderEmail: user.email,
    });
    await transaction.save();
    res.status(200).json({
      msg: "Transaction successful",
      info: `You sent ${formatCurrency(transferAmount / 100)} to ${
        recipient.name
      }`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
