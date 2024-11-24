//Volunteer schema (linked with VolunteerActivity)

const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
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
  availability: {
    type: String, // e.g., "Weekends", "Weekdays", "Anytime"
    required: true
  },
  registeredDate: {
    type: Date,
    default: Date.now
  },
  totalHoursWorked: {
    type: Number,
    default: 0
  },
  contributionLevel: {
    type: String,
    default: "Bronze" // Levels can be Bronze, Silver, Gold, Platinum based on contributions
  },
  badges: {
    type: [String], // Array to store badge names like ["Top Volunteer", "Super Delivery", etc.]
    default: []
  }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;
