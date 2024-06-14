const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.updateProfile = async (req, res) => {
    const { pin } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (pin) {
            const salt = await bcrypt.genSalt(10);
            user.pin = await bcrypt.hash(pin, salt);
        }

        await user.save();
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
