const { subscriptionModel } = require("../models/subscription.model");
const jwt = require("jsonwebtoken");

const getSubscription = async (req, res) => {
  const email = req.query.email;
  try {
    const data = await subscriptionModel.find({ email }).exec();

    if (data && data[0]?.dateUpgraded) {
      var diff = new Date() - data[0].dateUpgraded;
      const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

      if (diff > oneMonthInMilliseconds) {
        await subscriptionModel.findOneAndDelete({ email }).exec();
        return res.status(200).json([]);
      }
    }

    return res.status(200).json(data);
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

module.exports = {
  getSubscription,
  addSubscription,
};
