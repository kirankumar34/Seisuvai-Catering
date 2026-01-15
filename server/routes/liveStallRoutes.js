const express = require('express');
const router = express.Router();
const LiveStallEnquiry = require('../models/LiveStallEnquiry');
const adminAuth = require('../middleware/adminAuth');

// @route   POST /api/live-stalls
// @desc    Submit a live stall enquiry
// @access  Public
router.post('/', async (req, res) => {
    try {
        const enquiry = await LiveStallEnquiry.create(req.body);
        res.status(201).json({ success: true, data: enquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/live-stalls
// @desc    Get all live stall enquiries
// @access  Admin
router.get('/', adminAuth, async (req, res) => {
    try {
        const enquiries = await LiveStallEnquiry.find().sort({ createdAt: -1 });
        res.json({ success: true, count: enquiries.length, data: enquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
