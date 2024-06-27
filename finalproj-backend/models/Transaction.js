const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    senderEmail: { type: String },
    recipientEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    isExternal: { type: Boolean, required: true },
    isServicePayment: { type: Boolean, required: true },
    descriptionSender: { type: String },
    descriptionRecipient: { type: String },
    subServiceId: { type: String },
    subServiceName: { type: String },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
