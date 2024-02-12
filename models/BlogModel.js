const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    title: String,
    summary: String,
    content: String,
    filePath: String,
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("Blog", BlogSchema);

module.exports = blogModel;
