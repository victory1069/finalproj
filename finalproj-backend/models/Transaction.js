const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true }, // "credit" or "debit"
  date: { type: Date, default: Date.now },
  description: { type: String }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
