const mongoose = require('mongoose');

const CustomMenuRequestSchema = new mongoose.Schema({
    menuType: {
        type: String,
        enum: ['Veg', 'Non-Veg'],
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    mobile: {
        type: String,
        required: [true, 'Please add a mobile number']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    eventType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    pax: {
        type: Number,
        required: true
    },
    selectedDishes: [String],
    status: {
        type: String,
        enum: ['pending', 'handled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CustomMenuRequest', CustomMenuRequestSchema);
