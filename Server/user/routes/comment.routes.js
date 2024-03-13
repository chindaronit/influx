const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  getComments,
  addComment,
} = require("../controllers/comment.controller");

const router = express.Router();


router
  .route("/api")
  .get(authenticateToken, getComments)
  .post(authenticateToken, addComment)

module.exports = router;
