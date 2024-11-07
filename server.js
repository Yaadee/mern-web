// server.js
// import express from "express";
const express = require("express");

// import dotenv from "dotenv";
const dotenv = require("dotenv");
// import connectDB from "./config/db.js";
const connectDB = require("./config/db");
const app = express();

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the BF Charity Organization API!");
});
app.use("/register", require("./routes/userRoutes"));
// Connect to the MongoDB database using the connectDB function
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
