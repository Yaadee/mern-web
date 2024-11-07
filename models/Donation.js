const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const donationSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});
module.exports = mongoose.model("Donation", donationSchema);
