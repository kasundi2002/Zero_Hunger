//Orphanage

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphanageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  totalRequests: {
    type: Number, // Total requests made by the orphanage
    default: 0
  },
  totalFulfilled: {
    type: Number, // Total fulfilled requests
    default: 0
  },
  dateJoined: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Orphanage', OrphanageSchema);
