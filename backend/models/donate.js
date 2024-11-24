const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set to current date if not provided
  },
  status: {
    type: String,
    required: true,
    
  }
});

module.exports = mongoose.model("Donation", donationSchema);
