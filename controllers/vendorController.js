const Vendor = require("../models/Vendor");

const getVendors = async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

module.exports = { getVendors };
