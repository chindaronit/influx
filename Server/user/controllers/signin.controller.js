const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ msg: "email is required" });
    const user = await userModel.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ success: false, msg: "Unauthorised" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, msg: "Unauthorised" });
    }

    const access_token = jwt.sign(
      { email, password },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user: { name: user.name, email: user.email },
      access_token: access_token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error retrieving user",
      error: err.message,
    });
  }
};

module.exports = {
  handleSignin,
};
