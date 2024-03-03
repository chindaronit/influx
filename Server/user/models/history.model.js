const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    trim: true,
  },
  media_type: {
    type: String,
    required: true,
    trim: true,
  },
});

const historyModel = mongoose.model("history", historySchema);

module.exports = { historyModel };
