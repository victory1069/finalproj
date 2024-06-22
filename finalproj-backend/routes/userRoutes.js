const express = require("express");
const router = express.Router();
const { updateProfile, getUser } = require("../controllers/userController");
const auth = require("../middleware/authMiddlewar");
const User = require("../models/User");

router.put("/profile", auth, updateProfile);
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
