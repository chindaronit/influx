const { movieModel } = require("../models/movies.model");
const jwt = require("jsonwebtoken");

const getAllList = async (req, res) => {
  try {
    const data = await movieModel.find().exec();
    const uniqueTitlesSet = new Set(data.map((movie) => movie.title));

    // Initialize an array to store unique movie objects
    const uniqueMovies = [];

    // Find the first occurrence of each unique title in the original data
    uniqueTitlesSet.forEach((title) => {
      const movie = data.find((movie) => movie.title === title);
      if (movie) {
        uniqueMovies.push(movie);
      }
    });

    res.status(200).json(uniqueMovies);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unexpected thing occurred",
      error: error.message,
    });
  }
};

const getAllMovieFromSection = async (req, res) => {
  const section = req.query.section;
  try {
    const data = await movieModel.find({ section }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unexpected thing occurred",
      error: error.message,
    });
  }
};

const getMovieFromId = async (req, res) => {
  const itemId = req.query.itemId;
  try {
    const data = await movieModel.findOne({ itemId }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unexpected thing occurred",
      error: error.message,
    });
  }
};

const addMovie = async (req, res) => {
  const {
    itemId,
    src,
    title,
    year,
    genre,
    rating,
    duration,
    description,
    section,
  } = req.body;
  try {
    const item = await movieModel.findOne({ title, section }).exec();

    if (!item) {
      const newItem = new movieModel({
        itemId,
        src,
        title,
        year,
        genre,
        rating,
        duration,
        description,
        section,
      });

      await newItem.save();
      return res
        .status(200)
        .json({ msg: "Item Added to movielist", item: newItem });
    }

    res.status(200).json({ success: true, msg: "Item already exist" });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT, (err, user) => {
    if (err) return res.status(403).send("Forbidden");
    req.user = user;
    next();
  });
};


module.exports = {
  getAllList,
  getMovieFromId,
  getAllMovieFromSection,
  addMovie,
  authenticateToken
};
