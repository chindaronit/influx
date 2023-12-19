const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  itemId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  src: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  section: {
    type: String,
    required: true,
    trim: true,
    ref: "section",
    validate: {
      validator: async function (value) {
        const item = await mongoose
          .model("section")
          .findOne({ section: value });
        return item !== null;
      },
      message: "Section does not exist with this value.",
    },
  },
});

movieSchema.index({ title: 1, section: 1 }, { unique: true });

const movieModel = mongoose.model("movie", movieSchema);

module.exports = { movieModel };
