const { likedModel } = require("../models/liked.model");

const getList = async (req, res) => {
  const email = req.query.email;
  try {
    const data = await likedModel.find({ email }).exec();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const addItem = async (req, res) => {
  const { email, id, media_type } = req.body;

  try {
    const item = await likedModel.findOne({ email, id }).exec();
    if (!item) {
      const newItem = new likedModel({ email, id, media_type });
      await newItem.save();
      return res
        .status(200)
        .json({ msg: "Item Added to liked", item: newItem });
    }

    res.status(200).json({ success: true, msg: "Item already exist" });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
};

const removeItem = async (req, res) => {
  const { email, id, media_type } = req.body;

  try {
    await likedModel.findOneAndDelete({ email, id, media_type }).exec();
    res.status(200).json({ success: true, msg: "Item Removed!" });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
};

module.exports = {
  getList,
  addItem,
  removeItem,
};
