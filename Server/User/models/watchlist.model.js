const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
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
});

// Create a compound index on email and itemId to enforce uniqueness
watchlistSchema.index({ email: 1, itemId: 1 }, { unique: true });

const watchlistModel = mongoose.model("watchlist", watchlistSchema);

module.exports = { watchlistModel };
