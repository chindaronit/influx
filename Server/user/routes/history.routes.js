const express = require("express");
const {
  getList,
  addItem,
  removeItem,
} = require("../controllers/history.controller");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router
  .route("/api")
  .get(authenticateToken, getList)
  .post(authenticateToken, addItem)
  .delete(authenticateToken, removeItem);

module.exports = router;
