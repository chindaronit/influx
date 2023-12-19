const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

// Routers
const movieRouter = require("./routes/movies.routes");
const sectionRouter = require("./routes/section.routes");
const movieDetails = require("./routes/movieDetails.routes");
const watchlistRouter = require("./routes/watchlist.routes");
const conn = require("./models/conn");

app.use(express.json());
app.use(cors());

app.use("/movies", movieRouter);
app.use("/section", sectionRouter);
app.use("/movieDetails", movieDetails);
app.use("/watchlist", watchlistRouter);

app.listen(port, () => {
  console.log("Server is listening on port 5000...");
});
