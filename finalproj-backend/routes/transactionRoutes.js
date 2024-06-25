const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET /api/transactions/:userId
router.get('/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
