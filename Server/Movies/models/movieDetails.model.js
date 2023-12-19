const mongoose = require("mongoose");

// Define the schema
const movieDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    ref: "movie",
    validate: {
      validator: async function (value) {
        const item = await mongoose.model("movie").findOne({ title: value });
        return item !== null;
      },
      message: "Movie does not exist with this value.",
    },
  },
  cast: {
    type: [String],
    required: true,
    trim: true,
  },
  producers: {
    type: [String],
    required: true,
    trim: true,
  },
  directors: {
    type: [String],
    required: true,
    trim: true,
  },
  languages: {
    type: [String],
    required: true,
    trim: true,
  },
});

// Create the model
const movieDetailsModel = mongoose.model("MovieDetails", movieDetailsSchema);

module.exports={movieDetailsModel}
