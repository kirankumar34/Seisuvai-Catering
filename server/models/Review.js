const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
        trim: true
    },
    eventType: {
        type: String,
        enum: ['Wedding', 'Corporate', 'Family Function', 'Other'],
        default: 'Other'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
