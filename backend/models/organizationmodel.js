const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define Organization Schema
const orgSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: [true, "Organization name is required"],
  },
  orgRegistration: {
    type: String,
    required: [true, "Organization registration number is required"],
    unique: true,
  },
  contactPerson: {
    type: String,
    required: [true, "Contact person name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
});

// // Password hashing before saving
// orgSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = mongoose.model("Organization", orgSchema);
