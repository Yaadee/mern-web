const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required to register"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required to register"],
  },
  email: {
    type: String,
    required: [true, "Email is required to register"],
    unique: [true, "Email must be unique"],
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required to register"],
    unique: [true, "Phone number must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required to register"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required to register"]
  },
  refreshToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashing the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
