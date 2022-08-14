const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lineitem: {
    type: mongoose.Schema.ObjectId,
    ref: "LineItem",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ lineitem: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Order", OrderSchema);
