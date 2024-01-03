const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");

const handleSignup = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    if (!name || !dob || !email || !password)
      return res
        .status(400)
        .json({ success: false, msg: "All Fields are required" });
    const user = await userModel.findOne({ email }).exec();

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        name,
        dob,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return res
        .status(200)
        .json({ success: false, msg: "User Added", user: newUser });
    }

    res.status(409).json({ success: false, msg: "User already exist" }); // conflict
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
};

module.exports = {
  handleSignup,
};
