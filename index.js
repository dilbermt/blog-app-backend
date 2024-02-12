const express = require("express");
require("dotenv").config();
const cors = require("cors");
const authenticationRoutes = require("./routes/authenticationRoutes");
const connectDb = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const authentication = require("./middleware/authentication");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const port = process.env.PORT;

connectDb();
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", require("./routes/homeRoute"));

app.use("/", authenticationRoutes);
app.use(
  "/",
  authentication,
  upload.single("file"),
  require("./routes/blogRoutes")
);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
