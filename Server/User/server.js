const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const cors = require("cors");
require("dotenv").config();


const conn = require("./models/conn");

// Routers
const userRouter = require("./routes/user.routes");
const subscriptionRouter = require("./routes/subscription.routes");


app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/subscription", subscriptionRouter);

app.listen(port, () => {
  console.log("Server is listening on port 5001...");
});

