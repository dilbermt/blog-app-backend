const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies?.Authorization;

    if (!token) {
      res.status(401);
      throw new Error("token not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (Date.now() > decoded.exp) {
      res.status(401);
      throw new Error("Token expired");
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized user");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authentication;
