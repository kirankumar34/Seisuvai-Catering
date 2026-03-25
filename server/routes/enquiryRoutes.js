const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const adminAuth = require('../middleware/adminAuth');

// @route   POST /api/enquiries
// @desc    Create a new enquiry
// @access  Public
router.post('/', async (req, res) => {
    console.log('Incoming Enquiry:', req.body);
    try {
        const newEnquiry = new Enquiry(req.body);
        await newEnquiry.save();
        res.status(201).json({ success: true, data: newEnquiry });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/enquiries
// @desc    Get all enquiries
// @access  Admin
router.get('/', adminAuth, async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json({ success: true, data: enquiries });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   PUT /api/enquiries/:id/status
// @desc    Update enquiry status
// @access  Admin
router.put('/:id/status', adminAuth, async (req, res) => {
    try {
        const { status } = req.body;
        // Basic validation for new enum
        const validStatuses = ['pending', 'confirmed', 'negotiation', 'closed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' });
        }
        res.json({ success: true, data: enquiry });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   PUT /api/enquiries/:id/contacted
// @desc    Toggle contacted status
// @access  Admin
router.put('/:id/contacted', adminAuth, async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' });
        }

        enquiry.contacted = !enquiry.contacted;
        await enquiry.save();

        res.json({ success: true, data: enquiry });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
