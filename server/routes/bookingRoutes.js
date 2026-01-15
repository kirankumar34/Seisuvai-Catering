const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/bookings
// @desc    Get all bookings
// @access  Admin
router.get('/', adminAuth, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public
router.post(
    '/',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('phone', 'Phone number is required').not().isEmpty(),
        body('eventDate', 'Event date is required').not().isEmpty(),
        body('guests', 'Number of guests is required and must be a number').isNumeric(),
        body('eventType', 'Event type is required').not().isEmpty(),
        body('message', 'Message is required').not().isEmpty(),
        body('venue', 'Venue is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const mongoose = require('mongoose');
            if (mongoose.connection.readyState !== 1) {
                console.log('Demo Mode: Simulating successful booking save (No DB Connection)');
                return res.status(201).json({
                    success: true,
                    message: 'Demo Mode: Booking received!',
                    data: req.body
                });
            }

            const newBooking = new Booking(req.body);
            const booking = await newBooking.save();
            res.status(201).json({ success: true, data: booking });
        } catch (err) {
            console.error('Booking Error:', err.message);
            res.status(500).json({ success: false, message: 'Server Error: ' + err.message });
        }
    }
);

module.exports = router;
