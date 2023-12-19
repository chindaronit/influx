const express = require("express");
const router = express.Router();

const { getAllSection, addSection } = require("../controllers/section.controller");

router.route("/api").get(getAllSection).post(addSection);

module.exports = router;
