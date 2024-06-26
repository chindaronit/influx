const { historyModel } = require("../models/history.model");

const getList = async (req, res) => {
  const email = req.query.email;
  try {
    const data = await historyModel.find({ email }).exec();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const addItem = async (req, res) => {
  const { email, id, media_type } = req.body;

  try {
    const item = await historyModel.findOne({ email, media_type, id }).exec();
    if (!item) {
      const newItem = new historyModel({ email, id, media_type });
      await newItem.save();
      return res
        .status(200)
        .json({ msg: "Item Added to history", item: newItem });
    }

    res.status(200).json({ success: true, msg: "Item already exist" });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
};

const removeItem = async (req, res) => {
  const { email, id, media_type } = req.body;

  try {
    await historyModel.findOneAndDelete({ email, id, media_type }).exec();
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
