//Food donation schema

const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodDonationSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId, // References the restaurant that donated
    ref: 'Restaurant',
    required: true
  },
  foodType: {
    type: String, // Type of food (e.g., vegetarian, non-vegetarian)
    required: true
  },
  quantity: {
    type: Number, // Amount of food (in kg or pieces)
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  wasteReduction: {
    type: Number, // Estimate of how much waste was reduced (in kg)
    required: true
  }
});

module.exports = mongoose.model('FoodDonation', FoodDonationSchema);
