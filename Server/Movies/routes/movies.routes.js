const express = require("express");
const router = express.Router();

const {
  getAllList,
  getMovieFromId,
  getAllMovieFromSection,
  addMovie,
  authenticateToken
} = require("../controllers/movies.controller");

router.route("/api").get(getAllMovieFromSection).post(addMovie);
router.route("/api/all").get(getAllList);
router.route("/api/id").get(getMovieFromId);

module.exports = router;
