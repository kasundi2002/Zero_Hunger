//Report 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Report Schema
const reportSchema = new Schema({
  type: {
    type: String, // e.g., 'food_distribution', 'volunteer_contribution', 'restaurant_performance'
    required: true,
  },
  dateRange: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  generatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who generated the report
    required: true,
  },
  metrics: {
    foodDistributed: {
      type: Number, // Total amount of food distributed
      required: true,
    },
    mealsServed: {
      type: Number, // Total number of meals served
      required: true,
    },
    wasteReduced: {
      type: Number, // Total amount of food waste reduced
      required: true,
    },
  },
  volunteerInfo: [
    {
      volunteerId: {
        type: Schema.Types.ObjectId,
        ref: 'Volunteer', // Reference to the Volunteer schema
      },
      level: {
        type: Number, // Volunteer’s current level
      },
      badge: {
        type: String, // Badge earned by the volunteer
      },
    },
  ],
  restaurantInfo: [
    {
      restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant', // Reference to the Restaurant schema
      },
      contribution: {
        type: Number, // Total food contributed by the restaurant
      },
      badge: {
        type: String, // Badge earned by the restaurant
      },
    },
  ],
  orphanageInfo: [
    {
      orphanageId: {
        type: Schema.Types.ObjectId,
        ref: 'Orphanage', // Reference to the Orphanage schema
      },
      requestCount: {
        type: Number, // Number of requests made by the orphanage
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the report was created
  },
  format: {
    type: String, // e.g., 'pdf', 'excel'
    required: true,
  },
});

// Export the model
module.exports = mongoose.model('Report', reportSchema);
