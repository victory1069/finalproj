const User = require("../models/User");

function generateAccountNumber() {
  let accountNumber = "";
  for (let i = 0; i < 10; i++) {
    accountNumber += Math.floor(Math.random() * 10);
  }
  return accountNumber;
}

exports.signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const accountNumber = generateAccountNumber();
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    user = new User({
      name,
      email,
      phone,
      password,
      accountNumber,
    });
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        message: "User registered. Please verify your OTP.",
        userId: user.id,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: `Error registering user:${err}` });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });
    res.status(200).json({});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
