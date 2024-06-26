const User = require("../models/User");

exports.listServiceProviders = async (req, res) => {
  try {
    const serviceProviders = await User.find({
      isServiceProvider: true,
    }).select("-password");

    res.json({ success: true, data: { serviceProviders: serviceProviders } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!newPassword || !oldPassword) {
      return res
        .status(400)
        .json({ msg: "Please provide both old and new passwords." });
    }
    const user = await User.findById(req.userId);
    if (user.password !== oldPassword) {
      return res.status(400).json({ msg: "Old password does not match." });
    }
    user.password = newPassword;
    await user.save();
    res.json({
      user: user,
      success: true,
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { newName } = req.body;
    if (!newName) {
      return res.status(400).json({ msg: "Please provide a new name" });
    }
    const user = await User.findById(req.userId);

    user.name = newName;
    await user.save();
    res.json({
      user: user,
      success: true,
      message: "Name updated successfully.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
