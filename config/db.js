require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.DB;
const db = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: true,
    });
    console.log("connected to the Database");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};
module.exports = db;
