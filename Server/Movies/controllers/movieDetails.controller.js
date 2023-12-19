const { movieDetailsModel } = require("../models/movieDetails.model");

const getDetails = async (req, res) => {
  const title = req.query.title;
  try {
    const data = await movieDetailsModel.findOne({ title }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unexpected thing occurred",
      error: error.message,
    });
  }
};

const addDetails = async (req, res) => {
  const { title, cast, producers, directors, languages } = req.body;
  try {
    const item = await movieDetailsModel.findOne({ title }).exec();

    if (!item) {
      const newItem = new movieDetailsModel({
        title,
        cast,
        producers,
        directors,
        languages,
      });

      await newItem.save();
      return res
        .status(200)
        .json({ msg: "Item Added to movielist", item: newItem });
    }

    res.status(200).json({ success: true, msg: "Item already exist" });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};

module.exports = {
  getDetails,
  addDetails,
};
