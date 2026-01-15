const express = require('express');
const router = express.Router();
const CustomMenuRequest = require('../models/CustomMenuRequest');
const adminAuth = require('../middleware/adminAuth');

// @route   POST /api/custom-menu
// @desc    Submit a custom menu request
// @access  Public
router.post('/', async (req, res) => {
    try {
        const request = await CustomMenuRequest.create(req.body);
        res.status(201).json({ success: true, data: request });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/custom-menu
// @desc    Get all custom menu requests
// @access  Admin
router.get('/', adminAuth, async (req, res) => {
    try {
        const requests = await CustomMenuRequest.find().sort({ createdAt: -1 });
        res.json({ success: true, count: requests.length, data: requests });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   PUT /api/custom-menu/:id/handle
// @desc    Mark custom menu request as handled
// @access  Admin
router.put('/:id/handle', adminAuth, async (req, res) => {
    try {
        const request = await CustomMenuRequest.findByIdAndUpdate(req.params.id, { status: 'handled' }, { new: true });
        if (!request) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: request });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
