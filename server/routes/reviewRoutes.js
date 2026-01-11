const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews
// @access  Public
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json({ success: true, count: reviews.length, data: reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   POST /api/reviews
// @desc    Add a new review
// @access  Public
router.post('/', async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json({ success: true, data: review });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Admin (Public for demo)
router.put('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.json({ success: true, data: review });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Admin (Public for demo)
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Seed Initial Data (Helper function)
router.post('/seed', async (req, res) => {
    try {
        const dummyReviews = [
            { name: "Arjun Mehta", rating: 5, comment: "Exceptional service and the food was divine. The biryani was the star of the evening!", eventType: "Wedding" },
            { name: "Priya Sharma", rating: 4, comment: "Very professional team. Everything was set up on time and guests loved the appetizers.", eventType: "Corporate" },
            { name: "Karthik Raja", rating: 5, comment: "Authentic Brahmin Sadhya. Felt like a grand feast at home. Highly recommended.", eventType: "Family Function" },
            { name: "Sneha Reddy", rating: 5, comment: "The fusion buffet was a great hit at our housewarming party. Amazing quality.", eventType: "Other" },
            { name: "Vikram Singh", rating: 4, comment: "Great taste and excellent presentation. We will definitely book again.", eventType: "Corporate" },
            { name: "Ananya Iyer", rating: 5, comment: "Every dish was cooked to perfection. The sweets were particularly outstanding!", eventType: "Wedding" }
        ];

        await Review.deleteMany();
        const reviews = await Review.insertMany(dummyReviews);
        res.json({ success: true, message: "Reviews seeded", data: reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Seed failed' });
    }
});

module.exports = router;
