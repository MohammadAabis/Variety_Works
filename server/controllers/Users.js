const User = require('../models/Users');

const createUser = async (req, res) => {
  const { first_name, last_name, email, address, phone, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(200).json({
        status: 200,
        msg: "Email is already registered!",
      });
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(200).json({
        status: 200,
        msg: "Phone is already registered!",
      });
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      address,
      phone,
      password
    });

    await newUser.save();
    res.status(200).json({
      status: 200,
      msg: "User registered successfully!",
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      status: 500,
      msg: "An error occurred during registration.",
    });
  }
};

module.exports = { createUser };

