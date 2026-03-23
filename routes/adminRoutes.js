const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* IMPORT CONTROLLERS */
const {
  getAllUsers,
  createUser,
  disableUser,
  resetPassword,
  bulkCreateStudents,
  getAnalytics
} = require("../controllers/adminController");

/* IMPORT AUTH MIDDLEWARE */
const { protect, authorize } = require("../middleware/authMiddleware");


/* ======================
   ADMIN ROUTES
====================== */

router.get("/users", protect, authorize("admin"), getAllUsers);

router.post("/create-user", protect, authorize("admin"), createUser);

router.put("/disable-user/:id", protect, authorize("admin"), disableUser);

router.post("/reset-password/:id", protect, authorize("admin"), resetPassword);


/* BULK CSV STUDENT UPLOAD */

router.post(
  "/bulk-students",
  protect,
  authorize("admin"),
  upload.single("file"),
  bulkCreateStudents
);

router.get(
  "/analytics",
  protect,
  authorize("admin"),
  getAnalytics
);


module.exports = router;