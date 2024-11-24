const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizer: {
        name: {
            type: String,
            required: true,
        },
        contactEmail: {
            type: String,
            required: true,
        },
    },
    maxParticipants: {
        type: Number,
        required: true,
    },
});

const Event = mongoose.model("Eventt", eventSchema);

module.exports = Event;
