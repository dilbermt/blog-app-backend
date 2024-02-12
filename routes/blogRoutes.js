const express = require("express");
const { createPost, editBlog } = require("../controllers/blogControllers");

const router = express.Router();

router.route("/createpost").post(createPost);
router.route("/updateblog/:id").put(editBlog);

module.exports = router;
