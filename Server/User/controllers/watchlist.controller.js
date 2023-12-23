const { watchlistModel } = require("../models/watchlist.model");

const getList = async (req, res) => {
  const  email  = req.query.email;
  try {
    const data = await watchlistModel.find({ email }).exec();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const addItem = async (req, res) => {
  const { email, id, media_type } = req.body;
  
  try {
    const item = await watchlistModel.findOne({ email, id }).exec();
    if (!item) {
      const newItem = new watchlistModel({ email, id, media_type });
      await newItem.save();
      return res
        .status(200)
        .json({ msg: "Item Added to watchlist", item: newItem });
    }

    res.status(200).json({ success: true, msg: "Item already exist" });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};

const removeItem = async (req, res) => {
  const { email, id, media_type } = req.body;
  
  try {
    await watchlistModel.findOneAndDelete({ email, id , media_type }).exec();
    res.status(200).json({ success: true, msg: "Item Removed!" });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};

module.exports = {
  getList,
  addItem,
  removeItem
};