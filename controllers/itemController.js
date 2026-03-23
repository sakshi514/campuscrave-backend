const Item = require("../models/Item");
const mongoose = require("mongoose");

// Student & Vendor
const getItemsByVendor = async (req, res) => {
  try {
    const items = await Item.find({ vendorId: req.params.vendorId });
    res.json(items);
  } catch (err) {
    console.error("GET ITEMS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Vendor only
const addItem = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const item = await Item.create({
      vendorId: req.user.vendorId,
      vendorName: req.user.name,
      name,
      price,
      quantity,
      available: true, // ✅ ensure field exists
    });

    res.json(item);
  } catch (err) {
    console.error("ADD ITEM ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Vendor only — Toggle Availability
const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("TOGGLE ID:", id);

    // ✅ FIX 1: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // ✅ FIX 2: Ensure field exists
    if (item.available === undefined) {
      item.available = true;
    }

    item.available = !item.available;

    await item.save();

    res.json(item);
  } catch (err) {
    console.error("TOGGLE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Item Price
const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    console.log("PRICE UPDATE ID:", id, "PRICE:", price);

    // ✅ FIX 1: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // ✅ FIX 2: Ensure valid price
    if (price === undefined || isNaN(price)) {
      return res.status(400).json({ message: "Invalid price" });
    }

    item.price = Number(price);

    await item.save();

    res.json(item);
  } catch (err) {
    console.error("PRICE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getItemsByVendor,
  addItem,
  updateAvailability,
  updatePrice,
};