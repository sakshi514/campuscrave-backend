const express = require("express");
const router = express.Router();

const {
  getItemsByVendor,
  addItem,
  updateAvailability,
  updatePrice
} = require("../controllers/itemController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/:vendorId", protect, getItemsByVendor);

router.post("/", protect, authorize("vendor"), addItem);

router.put("/:id/toggle", protect, authorize("vendor"), updateAvailability);

// NEW ROUTE
router.put("/:id/price", protect, authorize("vendor"), updatePrice);

module.exports = router;
