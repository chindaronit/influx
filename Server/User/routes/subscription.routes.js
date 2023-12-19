const express = require("express");
const {
  getSubscription,
  addSubscription,
  authenticateToken,
} = require("../controllers/subscription.controller");
const router = express.Router();

router
  .route("/api")
  .get(authenticateToken, getSubscription)
  .post(authenticateToken, addSubscription);

module.exports = router;
