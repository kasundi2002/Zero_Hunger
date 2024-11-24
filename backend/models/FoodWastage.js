const mongoose = require('mongoose');

const foodWastageSchema = new mongoose.Schema({
    hotelname: {
        type: String,
        required: true
    },
    hotelowner: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    foodDescription: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    status: {
        type: String,
        enum: ['No volunteer assigned', 'Volunteer assigned', 'Food collected', 'Food distributed'], // Define the allowed statuses
        default: 'No volunteer assigned' // Default status
    }
});

module.exports = mongoose.model('FoodWastage', foodWastageSchema);
