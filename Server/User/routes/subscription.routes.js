const express = require("express");
const {
  getSubscription,
  addSubscription,
  authenticateToken,
} = require("../controllers/subscription.controller");
const router = express.Router();

router
  .route("/api")
  .get(getSubscription)
  .post(addSubscription);

module.exports = router;
