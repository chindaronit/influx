const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  signIn,
  authenticateToken,
} = require("../controllers/user.controller");
const router = express.Router();

router.route("/signup").post(addUser);
router.route("/signin").post(signIn);

router
  .route("/api")
  .get(getUser)
  .put(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser);

module.exports = router;
