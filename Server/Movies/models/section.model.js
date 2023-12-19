const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  sectionId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  section: {
    type: String,
    required: true,
    trim: true,
  }
});

const sectionModel = mongoose.model("section", sectionSchema);

module.exports = { sectionModel };
