const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    hotelname: {
        type: String,
        required: [true, 'Hotel name is required'],
    },
    hotelregistration: {
        type: String,
        required: [true, 'Hotel registration number is required'],
        unique: true,
    },
    hotelowner: {
        type: String,
        required: [true, 'Owner name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    nic: {
        type: String,
        required: [true, 'NIC is required'],
    },
    address: {
        type: String,
        required: [true, 'Address (Google Maps link) is required'],
    },
    mobileno: {
        type: String,
        required: [true, 'Mobile number is required'],
    },
});

module.exports = mongoose.model('User', userSchema);
