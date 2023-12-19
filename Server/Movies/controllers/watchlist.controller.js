const { watchlistModel } = require("../models/watchlist.model");
const { movieModel } = require("../models/movies.model");

const getList = async (req, res) => {
  try {
    const email = req.query.email;
    // Fetch user watchlist
    const watchlist = await watchlistModel.find({ email });

    // Extract movieIds from the watchlist
    const movieIds = watchlist.map((entry) => entry.itemId);

    // Fetch movie details using the movieIds
    const data = await movieModel.find({ itemId: { $in: movieIds } });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const addItem = async (req, res) => {
  const { email, itemId } = req.body;
  try {
    const item = await watchlistModel.findOne({ email, itemId }).exec();
    if (!item) {
      const newItem = new watchlistModel({ email, itemId });
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
  const { email, itemId } = req.body;
  try {
    await watchlistModel.findOneAndDelete({ email, itemId }).exec();

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
