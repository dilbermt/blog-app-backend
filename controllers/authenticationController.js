const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const loginController = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    // find a user with the email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("No user found with this email");
    }
    // if user exists, compare passwords
    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      res.status(401);
      throw new Error("Incorrect password");
    }

    // if passwords match, create a jwt token
    const expTime = Date.now() + 1000 * 60 * 60;
    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
        exp: expTime,
      },
      process.env.JWT_SECRET
    );

    // set the cookie as an http-only cookie
    res.cookie("Authorization", token, {
      httpOnly: true,
      expires: new Date(expTime),
      sameSite: "lax",
    });
    res.status(200).json({ message: "login successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const registerController = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    //   encrypting password
    const hashedPwd = bcrypt.hashSync(password, 8);
    // saving to db
    const user = await User.create({ email, password: hashedPwd });
    console.log(user);
    res.status(200).json({ message: "register succesful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const checkAuthController = async (req, res) => {
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
    res.status(200).json({ id: user._id });
  } catch (error) {
    console.log(error);
  }
};

const logOutController = async (req, res) => {
  res.cookie("Authorization", "");
  res.status(200).json("ok");
};
module.exports = {
  loginController,
  registerController,
  checkAuthController,
  logOutController,
};
