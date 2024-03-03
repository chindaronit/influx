const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();
const { handleSignup } = require("../controllers/signup.controller");
const { handleSignin } = require("../controllers/signin.controller");

router.route("/signup").post(handleSignup);
router.route("/signin").post(handleSignin);

router
  .route("/api")
  .get(authenticateToken, getUser)
  .put(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser);

module.exports = router;
