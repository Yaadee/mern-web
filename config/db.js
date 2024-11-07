// import dotenv from "dotenv";
// import mongoose from "mongoose";
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

module.exports =connectDB ;
