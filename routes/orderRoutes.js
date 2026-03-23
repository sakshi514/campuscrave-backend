const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getStudentOrders,
  getVendorOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, authorize("student"), placeOrder);
router.get("/student", protect, authorize("student"), getStudentOrders);
router.get("/vendor", protect, authorize("vendor"), getVendorOrders);
router.put("/:id/status", protect, authorize("vendor"), updateOrderStatus);

module.exports = router;
