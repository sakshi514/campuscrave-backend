const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // NEW: block disabled users
    if (user.isActive === false) {
      return res.status(403).json({ message: "Account disabled by admin" });
    }

    req.user = {
      id: user._id,
      userId: user.userId,
      role: user.role,
      vendorId: user.vendorId,
      vendorName: user.vendorName,
      name: user.name
    };

    next();

  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

module.exports = { protect, authorize };