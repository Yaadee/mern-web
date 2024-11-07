const mongoose = require("mongoose");
const User = require("./User");
const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema);
