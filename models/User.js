const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "vendor", "admin"],
    required: true,
  },

  // vendor users
  vendorId: {
    type: String,
    default: null,
  },

  vendorName: {
    type: String,
    default: null,
  },

  // student users
  name: {
    type: String,
    default: null,
  },

  department: {
    type: String,
    default: null,
  },

  batch: {
    type: Number,
    default: null,
  },

  year: {
    type: Number,
    default: null,
  },

  // account control
  isActive: {
    type: Boolean,
    default: true,
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);