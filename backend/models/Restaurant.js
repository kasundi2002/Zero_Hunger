//Restaurant schema (linked with FoodDonation)
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: String
  },
  totalFoodContributed: {
    type: Number,
    default: 0 // Track the total amount of food donated in kilograms or some other metric
  },
  contributionLevel: {
    type: String,
    default: "Bronze" // Levels can be Bronze, Silver, Gold, Platinum based on contributions
  },
  badges: {
    type: [String], // Array to store badge names like ["Top Donor", "Community Hero", etc.]
    default: []
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
