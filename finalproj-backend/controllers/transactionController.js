const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.retrieveTransactions = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) throw new Error("User not found");
    const transactions = await Transaction.find({
      $or: [{ senderEmail: user.email }, { recipientEmail: user.email }],
    });

    res.json({ success: true, data: { transactions } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      success: false,
      data: { message: `Server error, ${err.message}` },
    });
  }
};
