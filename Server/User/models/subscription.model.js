const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  plan: {
    type: String,
    required: true,
    trim: true,
  },
  dateUpgraded: {
    type: Date,
    required: true,
    trim: true,
  },
});

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);

module.exports = { subscriptionModel };
