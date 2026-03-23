const Item = require("../models/Item");

// Student & Vendor
const getItemsByVendor = async (req, res) => {
  try {
    const items = await Item.find({ vendorId: req.params.vendorId });
    res.json(items);
  } catch (err) {
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
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Vendor only
const updateAvailability = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.available = !item.available;

    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// NEW — Update Item Price
const updatePrice = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const { price } = req.body;

    item.price = price;

    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getItemsByVendor,
  addItem,
  updateAvailability,
  updatePrice,
};