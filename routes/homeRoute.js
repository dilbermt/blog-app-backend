const express = require("express");
const { getAllBlogs, getBlog } = require("../controllers/blogControllers");

const router = express.Router();

router.route("/getallblogs").get(getAllBlogs);
router.route("/blog/:id").get(getBlog);

module.exports = router;
