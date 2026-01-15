const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

// @route   POST /api/admin/login
// @desc    Verify admin passcode
// @access  Public
router.post('/login', (req, res) => {
    const { passcode } = req.body;

    if (!passcode) {
        return res.status(400).json({ success: false, message: 'Passcode is required' });
    }

    if (passcode === process.env.ADMIN_PASSCODE) {
        res.json({ success: true, message: 'Logged in successfully' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid passcode' });
    }
});

// @route   GET /api/admin/verify
// @desc    Verify if stored passcode is still valid
// @access  Admin
router.get('/verify', adminAuth, (req, res) => {
    res.json({ success: true, message: 'Authenticated' });
});

module.exports = router;
