const express = require("express");
const router = express.Router();

const { getDetails, addDetails } = require("../controllers/movieDetails.controller");

router.route("/api").get(getDetails).post(addDetails);

module.exports = router;
