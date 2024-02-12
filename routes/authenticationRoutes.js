const express = require("express");
const {
  loginController,
  registerController,
  checkAuthController,
  logOutController,
} = require("../controllers/authenticationController");

const router = express.Router();

router.route("/login").post(loginController);
router.route("/register").post(registerController);
router.route("/checkauth").get(checkAuthController);
router.route("/logout").get(logOutController);

module.exports = router;
