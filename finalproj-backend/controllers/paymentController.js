exports.payWithCard = async (req, res) => {
    const { cardDetails, amount } = req.body;

    // Integrate with a payment gateway here, e.g., Stripe
    // Assuming payment is successful:
    res.json({ msg: 'Payment successful', amount });
};

exports.payWithWallet = async (req, res) => {
    const { amount } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (user.walletBalance < amount) {
            return res.status(400).json({ msg: 'Insufficient balance' });
        }

        user.walletBalance -= amount;
        await user.save();

        res.json({ msg: 'Payment successful', amount });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
