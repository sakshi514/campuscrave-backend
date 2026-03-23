const mongoose = require("mongoose");
const Vendor = require("../models/Vendor");
const Item = require("../models/Item");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  try {
    await Vendor.deleteMany();
    await Item.deleteMany();

    // ---------------- Vendors ----------------
    const vendors = [
      {
        vendorId: "V001",
        name: "Nithya Amirtham",
        logo: "/images/vendors/nithya.png",
      },
      {
        vendorId: "V002",
        name: "Hot Breads",
        logo: "/images/vendors/hotbreads.png",
      },
      {
        vendorId: "V003",
        name: "Quench",
        logo: "/images/vendors/quench.png",
      },
    ];

    await Vendor.insertMany(vendors);

    // ---------------- Items ----------------

    const items = [

      // -------- Nithya Amirtham (V001) --------
      // Quick bites
      { vendorId: "V001", name: "Mini samosa", price: 25, quantity: 50, category: "Quick Bites" },
      { vendorId: "V001", name: "Samosa", price: 35, quantity: 50, category: "Quick Bites" },
      { vendorId: "V001", name: "Veg cutlet", price: 35, quantity: 40, category: "Quick Bites" },
      { vendorId: "V001", name: "Vada pav", price: 50, quantity: 40, category: "Quick Bites" },

      // Sandwiches
      { vendorId: "V001", name: "Veg sandwich", price: 60, quantity: 30, category: "Sandwiches" },
      { vendorId: "V001", name: "Chilli cheese sandwich", price: 70, quantity: 30, category: "Sandwiches" },
      { vendorId: "V001", name: "Paneer sandwich", price: 75, quantity: 25, category: "Sandwiches" },

      // Fries
      { vendorId: "V001", name: "French fries", price: 80, quantity: 40, category: "Fries" },
      { vendorId: "V001", name: "Peri Peri fries", price: 85, quantity: 40, category: "Fries" },
      { vendorId: "V001", name: "Cheese Fries", price: 85, quantity: 35, category: "Fries" },

      // Chaat
      { vendorId: "V001", name: "Pani puri", price: 35, quantity: 60, category: "Chaat" },
      { vendorId: "V001", name: "Dahi puri", price: 50, quantity: 50, category: "Chaat" },
      { vendorId: "V001", name: "Pav bhaji", price: 60, quantity: 40, category: "Chaat" },
      { vendorId: "V001", name: "Bhel puri", price: 65, quantity: 40, category: "Chaat" },
      { vendorId: "V001", name: "Channa masala", price: 65, quantity: 35, category: "Chaat" },
      { vendorId: "V001", name: "Channa samosa", price: 75, quantity: 30, category: "Chaat" },

      // Rice items
      { vendorId: "V001", name: "Veg pulao", price: 90, quantity: 30, category: "Rice Items" },
      { vendorId: "V001", name: "Fried rice", price: 90, quantity: 30, category: "Rice Items" },
      { vendorId: "V001", name: "Veg biryani", price: 90, quantity: 30, category: "Rice Items" },
      { vendorId: "V001", name: "Sambar rice", price: 85, quantity: 30, category: "Rice Items" },

      // Beverages
      { vendorId: "V001", name: "Lemon juice", price: 30, quantity: 60, category: "Beverages" },
      { vendorId: "V001", name: "Lime soda", price: 35, quantity: 60, category: "Beverages" },
      { vendorId: "V001", name: "Tea", price: 25, quantity: 80, category: "Beverages" },
      { vendorId: "V001", name: "Coffee", price: 30, quantity: 80, category: "Beverages" },
      { vendorId: "V001", name: "Milk", price: 20, quantity: 80, category: "Beverages" },

      // -------- Hot Breads (V002) --------
      { vendorId: "V002", name: "Korean bun", price: 110, quantity: 25 },
      { vendorId: "V002", name: "Bread pizza", price: 120, quantity: 25 },
      { vendorId: "V002", name: "Cinnamon roll", price: 90, quantity: 30 },
      { vendorId: "V002", name: "Veg puff", price: 90, quantity: 40 },
      { vendorId: "V002", name: "Choco lava cake", price: 100, quantity: 20 },
      { vendorId: "V002", name: "Black forest cake", price: 115, quantity: 20 },
      { vendorId: "V002", name: "Choco chip cookie", price: 55, quantity: 50 },
      { vendorId: "V002", name: "Plain cookie", price: 50, quantity: 50 },

      // -------- Quench (V003) --------
      { vendorId: "V003", name: "Lemon juice", price: 30, quantity: 60 },
      { vendorId: "V003", name: "Watermelon juice", price: 55, quantity: 40 },
      { vendorId: "V003", name: "Guava juice", price: 60, quantity: 40 },
      { vendorId: "V003", name: "Orange juice", price: 55, quantity: 40 },
      { vendorId: "V003", name: "Cold coffee", price: 80, quantity: 35 },
      { vendorId: "V003", name: "Rose milk", price: 75, quantity: 35 },

    ];

    await Item.insertMany(items);

    console.log("Vendors & Items seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
