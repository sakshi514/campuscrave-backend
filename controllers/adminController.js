const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const csv = require("csv-parser");

const { Readable } = require("stream");


// ==========================
// GET ALL USERS
// ==========================
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({ message: "Failed to load users" });

  }
};


// ==========================
// CREATE USER
// ==========================
const createUser = async (req, res) => {

  try {

    const {
      userId,
      password,
      role,
      vendorId,
      vendorName,
      name,
      department,
      batch,
      year
    } = req.body;

    const existing = await User.findOne({ userId });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      userId,
      password: hashedPassword,
      role,
      vendorId,
      vendorName,
      name,
      department,
      batch,
      year,
      isActive: true
    });

    res.json({ message: "User created successfully" });

  } catch (error) {

    res.status(500).json({ message: "User creation failed" });

  }

};


// ==========================
// DISABLE USER
// ==========================
const disableUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;

    await user.save();

    res.json({
      message: "User status updated",
      isActive: user.isActive
    });

  } catch (error) {

    res.status(500).json({ message: "Failed to update user status" });

  }

};


// ==========================
// RESET PASSWORD
// ==========================
const resetPassword = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const random = Math.floor(1000 + Math.random() * 9000);
    const newPassword = "CC" + random;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password reset successful",
      newPassword
    });

  } catch (error) {

    res.status(500).json({ message: "Password reset failed" });

  }

};


// ==========================
// BULK CREATE STUDENTS
// ==========================
const bulkCreateStudents = async (req, res) => {

  try {

    const results = [];

    const stream = Readable.from([req.file.buffer]);

    stream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {

        const createdUsers = [];

        for (let row of results) {

          const password = "CC" + Math.floor(1000 + Math.random() * 9000);

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          
          await User.create({
            userId: row.RegisterNo,
            password: hashedPassword,
            role: "student",
            name: row.Name,
            department: row.Department,
            year: row.Year,
            isActive: true
          });

          createdUsers.push({
            userId: row.RegisterNo,
            password
          });

        }

        res.json({
          message: "Students created successfully",
          credentials: createdUsers
        });

      });

  } catch (error) {

    res.status(500).json({ message: "Bulk upload failed" });

  }

};

// ==========================
// ANALYTICS
// ==========================

const getAnalytics = async (req,res)=>{

try{

const orders = await Order.find();

const totalOrders = orders.length;

const today = new Date();
today.setHours(0,0,0,0);

const todayOrders = orders.filter(o =>
new Date(o.createdAt) >= today
).length;


/* ---------------------------
   Vendor Performance
---------------------------- */

const vendorStats = {};

orders.forEach(order => {

const vendor = order.vendorName || "Unknown";

if(!vendorStats[vendor]){
vendorStats[vendor] = 0;
}

vendorStats[vendor]++;

});


/* ---------------------------
   Top Selling Items
---------------------------- */

const itemStats = {};

orders.forEach(order => {

order.items.forEach(item => {

if(!itemStats[item.name]){
itemStats[item.name] = 0;
}

itemStats[item.name] += item.quantity;

});

});


const topItems = Object.entries(itemStats)
.sort((a,b)=>b[1]-a[1])
.slice(0,5);


res.json({
totalOrders,
todayOrders,
vendorStats,
topItems
});

}catch(err){

res.status(500).json({message:"Analytics failed"});

}

};

module.exports = {
  getAllUsers,
  createUser,
  disableUser,
  resetPassword,
  bulkCreateStudents,
  getAnalytics
};