const express = require("express");
const router = express.Router();
const {
  getSystem,
  updateSystem,
} = require("../controllers/systemController");

router.get("/", getSystem);
router.put("/", updateSystem);

module.exports = router;