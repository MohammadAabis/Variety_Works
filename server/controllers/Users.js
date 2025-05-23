const User = require("../models/Users");

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
      password,
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: 400,
        msg: "User not found!",
      });
    }
    else{
      if (user.password != password) {
        return res.json({
          status: 400,
          msg: "Invalid credentials!",
        });
      }
      else{
        // If credentials are correct
        return res.json({
          status: 200,
          msg: "Login successful!",
          user,  
        })
      }
    }  
    
  } catch (e) {
    res.json({
      status: 500,
      msg: "An error occurred during login.",
    });
  }
};

module.exports = { createUser, loginUser };
