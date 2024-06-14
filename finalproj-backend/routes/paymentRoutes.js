const express = require('express');
const router = express.Router();
const { payWithCard, payWithWallet } = require('../controllers/paymentController');
const auth = require('../middleware/authMiddlewar');

router.post('/pay-with-card', auth, payWithCard);
router.post('/pay-with-wallet', auth, payWithWallet);

module.exports = router;
