import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.DB;

const db = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("Connected to the Database");

    process.exit(0);
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

db();
