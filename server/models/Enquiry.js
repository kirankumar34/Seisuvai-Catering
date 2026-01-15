const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    email: {
        type: String
    },
    enquiryType: {
        type: String,
        enum: ['booking', 'custom_menu', 'live_stall'],
        required: true
    },
    selectedItems: {
        type: [String],
        default: []
    },
    paxCount: {
        type: Number
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
