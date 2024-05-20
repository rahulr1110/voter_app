const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if (!authorization)
    return res.status(401).json({
      success: false,
      message: "auth token not found",
    });
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "token not found",
    });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
