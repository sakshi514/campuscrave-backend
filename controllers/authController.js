const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.isActive === false){
      return res.status(403).json({
        message: "Account disabled. Contact administrator."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
console.log("LOGIN BODY:", req.body);
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        vendorId: user.vendorId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      vendorId: user.vendorId,
      userId: user.userId,
      name: user.name,
      vendorName: user.vendorName
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };

