const { subscriptionModel } = require("../models/subscription.model");
const jwt = require("jsonwebtoken");

const getSubscription = async (req, res) => {
  const email = req.query.email;
  try {
    const data = await subscriptionModel.find({ email }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unexpected thing occurred",
      error: error.message,
    });
  }
};

const addSubscription = async (req, res) => {
  const { email, plan, dateUpgraded } = req.body;

  try {
    const item = await subscriptionModel.findOne({ email }).exec();

    if (item) {
      await subscriptionModel.findOneAndDelete({ email }).exec();
    }

    const newItem = new subscriptionModel({
      email,
      plan,
      dateUpgraded,
    });

    await newItem.save();

    return res.status(200).json({ msg: "Plan Upgraded", item: newItem });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error upgrading plan", message: err.message });
  }
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
  getSubscription,
  addSubscription,
  authenticateToken
};
