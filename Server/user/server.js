const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

const conn = require("./models/conn");

// Routers
const userRouter = require("./routes/user.routes");
const subscriptionRouter = require("./routes/subscription.routes");
const watchlistRouter = require("./routes/watchlist.routes");
const likedRouter = require("./routes/liked.routes");
const favouriteRouter = require("./routes/favourite.routes");
const historyRouter = require("./routes/history.routes");
const commentRouter = require("./routes/comment.routes");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/subscription", subscriptionRouter);
app.use("/watchlist", watchlistRouter);
app.use("/liked", likedRouter);
app.use("/favourite", favouriteRouter);
app.use("/history", historyRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log("Server is listening on port 80...");
});

