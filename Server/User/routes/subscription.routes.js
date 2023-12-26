const express = require("express");
const {
  getSubscription,
  addSubscription,
} = require("../controllers/subscription.controller");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router
  .route("/api")
  .get(authenticateToken, getSubscription)
  .post(authenticateToken, addSubscription);

module.exports = router;
