const User = require("../models/User");
const Services = require("../models/Services");

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

exports.createNewService = async (req, res) => {
  try {
    const { amount, serviceName } = req.body;
    const ownerId = req.userId;
    if (!serviceName || amount === undefined) {
      return res
        .status(400)
        .json({ msg: "Please provide service name and amount." });
    }

    const newService = new Services({
      serviceName,
      amount,
      ownerId,
    });

    await newService.save();

    // Fetch all services for the ownerId
    const allServices = await Services.find({ ownerId });

    res.json({
      services: allServices,
      success: true,
      message: "Service created successfully.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllServicesForUser = async (req, res) => {
  try {
    const ownerId = req.userId;

    const allServices = await Services.find({ ownerId });
    if (!allServices) {
      return res.status(404).json({ msg: "No services found for this user." });
    }

    res.json({
      services: allServices,
      success: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
