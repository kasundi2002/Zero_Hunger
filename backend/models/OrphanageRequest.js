//Routes for orphanage requests

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphanageRequestSchema = new Schema({
  orphanage: {
    type: Schema.Types.ObjectId, // References the orphanage making the request
    ref: 'Orphanage',
    required: true
  },
  foodType: {
    type: String, // Requested food type
    required: true
  },
  quantityRequested: {
    type: Number, // Quantity of food requested
    required: true
  },
  quantityDelivered: {
    type: Number, // Quantity of food actually delivered
    default: 0
  },
  status: {
    type: String, // 'pending', 'fulfilled', 'in-progress'
    default: 'pending'
  },
  dateRequested: {
    type: Date,
    default: Date.now
  },
  dateFulfilled: {
    type: Date
  }
});

module.exports = mongoose.model('OrphanageRequest', OrphanageRequestSchema);

  