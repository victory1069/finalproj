const express = require("express");
const router = express.Router();
const {
  listServiceProviders,
  updatePassword,
  updateUsername,
  createNewService,
  listServices,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddlewar");
const User = require("../models/User");

router.put("/updatePassword", auth, updatePassword);
router.put("/updateUsername", auth, updateUsername);
// router.get("/serviceProviders", auth, listServiceProviders);
router.post("/createNewService", auth, createNewService);
router.get("/listServices", listServices);

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    // dont send password to FE
    const { password: _pass, ...restOfUser } = user.toJSON();
    res.json(restOfUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
