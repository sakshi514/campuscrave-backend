const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },

    // ✅ ADD THIS
    logo: {
      type: String
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);


