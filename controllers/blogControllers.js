const Blog = require("../models/BlogModel");
const fs = require("fs");

const createPost = async (req, res) => {
  console.log("req body", req.body);
  console.log("req file", req.file);
  try {
    let filePath = "";
    if (req.file) {
      const filenameParts = req.file.originalname.split(".");
      const extension = filenameParts[filenameParts.length - 1];
      const path = req.file.path;
      filePath = path + "." + extension;
      fs.renameSync(path, filePath);
    }

    //   create the blog in the db
    const { title, summary, content } = req.body;
    const author = req.user._id;
    console.log("user id", author);
    const blog = await Blog.create({
      author,
      title,
      summary,
      content,
      filePath,
    });
    console.log(blog);
    res.status(200).json({ created: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ created: false });
  }
  //   console.log(title, summary, file, content);
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", ["email"])
      .sort({ createdAt: -1 })
      .limit(20);
    console.log(blogs);
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id----->", id);
    const blog = await Blog.findById(id).populate("author", ["email"]);
    console.log(blog);
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    res.status(404).json("not found");
  }
};

const editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.body.id);
    console.log(blog);
    console.log("user id and author id", req.user._id, blog.author);
    if (req.user._id.toString() !== blog.author.toString()) {
      console.log("unauthorized");
      res.status(401).json("unauthorized");
    }
    let filePath;
    if (req.file) {
      const filenameParts = req.file.originalname.split(".");
      const extension = filenameParts[filenameParts.length - 1];
      const path = req.file.path;
      filePath = path + "." + extension;
      fs.renameSync(path, filePath);
    }

    //   create the blog in the db
    const { title, summary, content } = req.body;
    const author = req.user._id;
    console.log("user id", author);
    const updatedBlog = await Blog.findByIdAndUpdate(blog._id, {
      author,
      title,
      summary,
      content,
      filePath: filePath ? filePath : blog.filePath,
    });
    console.log("updated blog --->", updatedBlog);
    res.status(200).json({ created: true });
  } catch (error) {
    console.log("error --->", error);
    res.status(401).json("unauthorized");
  }
};

module.exports = { createPost, getAllBlogs, getBlog, editBlog };
