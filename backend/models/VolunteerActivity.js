//Volunteer activity schema

const mongoose = require('mongoose');

const volunteerActivitySchema = new mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',  // References the Volunteer schema
    required: true
  },
  activityType: {
    type: String, // e.g., "Food Delivery", "Packaging", etc.
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String // Additional details about the activity
  },
  hoursWorked: {
    type: Number, // Tracking the number of hours the volunteer worked
    required: true
  }
});

const VolunteerActivity = mongoose.model('VolunteerActivity', volunteerActivitySchema);
module.exports = VolunteerActivity;
