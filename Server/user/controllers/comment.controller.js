const { commentModel } = require("../models/comment.model");

const getComments = async (req, res) => {
  const { media_type, id, episode, season } = req.query;

  try {
    const data = await commentModel
      .find({ media_type, id, season, episode })
      .exec();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const addComment = async (req, res) => {
  const { media_type, id, user_name, email, comment, season, episode } =
    req.body;
  const time = new Date();
  try {
    const newItem = new commentModel({
      user_name,
      email,
      media_type,
      id,
      time,
      comment,
      season,
      episode,
    });
    await newItem.save();

    const data = await commentModel.find({ media_type, id }).exec();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
};

module.exports = {
  getComments,
  addComment,
};
