require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = async () => {
    const mongoose = require('mongoose');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // We'll keep the server running even if DB fails for demo purposes, 
        // but normally you'd exit.
        console.log('Server running without DB connection (Demo Mode)');
    }
};

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Serve static assets in production (and development)
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

// Fallback (Temporarily disabled for Express 5 compatibility investigation)
// app.get('(.*)', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// Health check endpoint (moved or kept)
app.use('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
