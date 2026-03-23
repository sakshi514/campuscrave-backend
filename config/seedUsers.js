const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

// simple random password generator
const generatePassword = () => {
  return Math.random().toString(36).slice(-8) + "@CC";
};

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const plainUsers = [

      // -------- Vendors --------
      { userId: "vendor01", role: "vendor", vendorId: "V001" },
      { userId: "vendor02", role: "vendor", vendorId: "V002" },
      { userId: "vendor03", role: "vendor", vendorId: "V003" },

      // -------- BCA --------
      { userId: "2313721033001", name: "Ananya", registerNumber: "2313721033001", department: "BCA" },
      { userId: "2313721033002", name: "Bhavya", registerNumber: "2313721033002", department: "BCA" },
      { userId: "2313721033003", name: "Priya", registerNumber: "2313721033003", department: "BCA" },
      { userId: "2313721033004", name: "Vaani", registerNumber: "2313721033004", department: "BCA" },
      { userId: "2313721033005", name: "Sakshi", registerNumber: "2313721033005", department: "BCA" },

      // -------- B.Com Marketing Management --------
      { userId: "2313721045001", name: "Sanjana", registerNumber: "2313721045001", department: "B.Com Marketing Management" },
      { userId: "2313721045002", name: "Disha", registerNumber: "2313721045002", department: "B.Com Marketing Management" },
      { userId: "2313721045003", name: "Diya", registerNumber: "2313721045003", department: "B.Com Marketing Management" },
      { userId: "2313721045004", name: "Rathi", registerNumber: "2313721045004", department: "B.Com Marketing Management" },
      { userId: "2313721045005", name: "Nisha", registerNumber: "2313721045005", department: "B.Com Marketing Management" },

    ];

    const users = [];

    console.log("\n===== DEMO LOGIN CREDENTIALS =====\n");

    for (const u of plainUsers) {
      const rawPassword = generatePassword();
      const hashed = await bcrypt.hash(rawPassword, 10);

      const userDoc = {
        userId: u.userId,
        password: hashed,
        role: u.role || "student",
        name: u.name,
        registerNumber: u.registerNumber,
        department: u.department,
        vendorId: u.vendorId,
      };

      users.push(userDoc);

      console.log(`UserID: ${u.userId}  |  Password: ${rawPassword}`);
    }

    await User.insertMany(users);

    console.log("\nUsers seeded successfully\n");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
