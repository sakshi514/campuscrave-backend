const express = require("express");
const router = express.Router();
const { getVendors } = require("../controllers/vendorController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getVendors);

module.exports = router;
