const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const Address = require("./Address");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
  },

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
    enum: ["Male", "Female"],
    required: [true, "Gender is required to register"],
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      // required: true,
    },
  ],

  dateOfBirth: {
    type: Date,
    required: [true, "Date of Birth is required to register"],
  },
  isVolunteer: {
    type: Boolean,
    required: false,
  },
  organization: {
    type: String,
  },
  organizationDescription: {
    type: String,
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
