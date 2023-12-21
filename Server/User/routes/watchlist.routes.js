const express = require("express");
const {
  getList,
  addItem,
  removeItem,
} = require("../controllers/watchlist.controller");
const router = express.Router();

router.route("/api").get(getList).post(addItem).delete(removeItem);

module.exports = router;
