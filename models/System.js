const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema({
  announcement: { type: String, default: "" },
});

module.exports = mongoose.model("System", systemSchema);




