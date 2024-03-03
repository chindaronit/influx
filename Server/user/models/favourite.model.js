const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
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

const favouriteModel = mongoose.model("favourite", favouriteSchema);

module.exports = { favouriteModel };
