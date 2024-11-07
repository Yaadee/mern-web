const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
});

module.exports = mongoose.model("Address", addressSchema);
