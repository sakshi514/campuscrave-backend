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
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { available: req.body.available } }, // OR toggle from frontend
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    console.error("TOGGLE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Item Price
const updatePrice = async (req, res) => {
  try {
    const { price } = req.body;

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { price: Number(price) },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

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