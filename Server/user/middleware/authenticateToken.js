const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const cookie = req.cookies;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token && !cookie?.jwt) return res.status(401).send("Unauthorized");
  const value = token ? token: cookie.jwt;
  
  jwt.verify(value, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden"); // invalid token
    }

    const { email, password } = decoded;
    req.email = email;
    req.password = password;
    next();
  });
};

module.exports = authenticateToken;
