const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    vendorId: {
      type: String,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {              // ✅ ADD THIS
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);