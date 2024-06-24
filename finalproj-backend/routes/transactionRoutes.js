const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddlewar");
const {
  retrieveTransactions,
} = require("../controllers/transactionController");

router.get("/", auth, retrieveTransactions);

module.exports = router;
