const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
console.log("MongoDB Atlas URI:", uri);

mongoose.connect(uri);

const conn = mongoose.connection;

conn.on("error", (error) => {
  console.error("MongoDB Connection Error:", error);
});

conn.once("open", () => {
  console.log("Connection Established");
});

module.exports = { conn };
