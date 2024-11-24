// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const Organization = require("../models/organizationmodel");

// middlewares/authMiddleware.js
const authmiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (user) {
      req.user = { ...user._doc, role: "hotel" };
      return next();
    }

    const organization = await Organization.findById(decoded.id);
    if (organization) {
      req.user = { ...organization._doc, role: "organization" }; // Use req.user to avoid confusion
      return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authmiddleware;
