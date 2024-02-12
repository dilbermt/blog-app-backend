const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`db connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;
