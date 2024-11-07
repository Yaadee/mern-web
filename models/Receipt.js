const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const receiptSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
    },
    user: {
        type: mongoose.Schema.Types.id,
        ref: "User",
        required: true,
    },
    donation: {
        type: mongoose.Schema.Types.id,
        ref: "Donation",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    File:{
        type: String,
        required: true,
        // You can use a file upload library like multer to save the file path to the database

    },
    date: {
        type: Date,
        default: Date.now,
    },
})