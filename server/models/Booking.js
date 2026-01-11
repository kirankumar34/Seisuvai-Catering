const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    eventDate: {
        type: Date,
        required: [true, 'Please add an event date']
    },
    guests: {
        type: Number,
        required: [true, 'Please add the number of guests']
    },
    eventType: {
        type: String,
        required: [true, 'Please select an event type'],
        enum: ['wedding_ceremony', 'wedding_reception', 'birthday', 'puberty_function', 'baby_shower', 'housewarming', 'corporate', 'other']
    },
    message: {
        type: String,
        required: [true, 'Please add a message'],
        trim: true
    },
    venue: {
        type: String,
        required: [true, 'Please add a venue'],
        trim: true
    },
    package: {
        type: String,
        default: 'none'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
