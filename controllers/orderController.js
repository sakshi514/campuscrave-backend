const Order = require("../models/Order");
const Item = require("../models/Item");
const User = require("../models/User");

// ============================
// Vendor ID → Vendor Name Map
// ============================
const vendorMap = {
  V001: "Nithya Amirtham",
  V002: "Hot Breads",
  V003: "Quench"
};

// ============================
// Student places order
// ============================
const placeOrder = async (req, res) => {
  try {

    const { vendorId, items } = req.body;

    let total = 0;

    // Validate items & calculate total
    for (let i of items) {

      const item = await Item.findById(i.itemId);

      if (!item || !item.available) {
        return res.status(400).json({ message: "Item unavailable" });
      }

      total += item.price * i.quantity;

    }

    // Create order
    const order = await Order.create({
      orderId: "ORD" + Date.now(),

      studentId: req.user.userId,
      studentName: req.user.userId,

      vendorId: vendorId,
      vendorName: vendorMap[vendorId] || vendorId,

      items: items,

      totalAmount: total
    })
    
    req.app.get("io").emit("newOrder",{
      vendorId: vendorId
    });

    // 🔥 SOCKET EMIT (NEW ORDER)
    const io = req.app.get("io");

    io.emit("newOrder", {
      orderId: order.orderId,
      vendorId: order.vendorId,
      studentId: order.studentId,
      status: order.status,
    });

    res.json(order);

  } catch (error) {

    console.log("Order error:", error);

    res.status(500).json({
      message: "Order failed",
      error: error.message
    });

  }
};


// ============================
// Student views own orders
// ============================
const getStudentOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      studentId: req.user.userId
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: "Error loading orders" });

  }
};


// ============================
// Vendor views orders
// ============================
const getVendorOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      vendorId: req.user.vendorId
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: "Error loading vendor orders" });

  }

};


// ============================
// Vendor updates order status
// ============================
const updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;

    // Completed → hide from incoming orders
    if (req.body.status === "Completed") {
      order.isActive = false;
    }

    await order.save();

    // 🔥 SOCKET EMIT (STATUS UPDATE)
    const io = req.app.get("io");

    io.emit("orderUpdated", {
      orderId: order.orderId,
      status: order.status,
      userId: order.studentId,
      vendorId: order.vendorId,
    });
    console.log("emitting socket event");

    res.json(order);

  } catch (error) {

    res.status(500).json({ message: "Status update failed" });

  }

};


module.exports = {
  placeOrder,
  getStudentOrders,
  getVendorOrders,
  updateOrderStatus,
};