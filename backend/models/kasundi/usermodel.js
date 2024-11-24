//User schema for all user types (admin, volunteer, restaurant, orphanage)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  nic: {
    type: String,
    required: [true, 'NIC is required'],
},
  userType: { 
    type: String, 
    enum: ['volunteer', 'restaurantOwner', 'orphanageOwner', 'admin'], 
    required: true 
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
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

const UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;
