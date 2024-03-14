const mongoose = require('mongoose');

// Define the schema for the Event model
const eventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true
    },
    conductedOn: {
        type: String,
        required: true
    },
    conductedAt: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    totalBeneficiaries: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
});

// Create and export the Event model
module.exports = mongoose.model('Event', eventSchema);
