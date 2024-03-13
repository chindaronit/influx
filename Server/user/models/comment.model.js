const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    required: true,
    trim: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: Date,
    required: true,
    trim: true,
  },
  season: {
    type: String,
    trim: true,
  },
  episode: {
    type: String,
    trime: true,
  },
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = { commentModel };
