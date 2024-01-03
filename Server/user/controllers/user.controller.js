const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unexpected thing occured",
      error: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({success:false, msg: "email is required" });
    const user = await userModel.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: "true", user: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error retrieving user",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  const email = req.body.email;
  const updatedParams = req.body;
  try {
    const user = await userModel.findOneAndUpdate({ email }, updatedParams);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, msg: "User updated successfully", data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Error updating user", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await userModel.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, msg: "User deleted successfully", data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Error deleting user", error: err.message });
  }
};

const signIn = async (req, res) => {
  const email = req.body.email;
  const isuserexist = await userModel.findOne({ email }).exec();
  if (isuserexist) {
    const user = { email: req.body.email, password: req.body.password };
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRECT, {
      expiresIn: "2h",
    });
    return res.status(200).json({ access_token: access_token });
  }

  return res.status(404).json({ success: "false", msg: "User Does Not Exist" });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT, (err, user) => {
    if (err) return res.status(403).send("Forbidden");
    req.user = user;
    next();
  });
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  signIn,
  authenticateToken,
};
