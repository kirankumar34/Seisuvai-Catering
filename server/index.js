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

// Health check endpoint (placed before wildcard SPA routing)
app.use('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

// Middleware
const allowedOrigins = [
    'http://localhost:5000',
    'http://localhost:5500',
    'http://localhost:5173',
    process.env.FRONTEND_URL,
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [])
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        if (!origin) return callback(null, true);

        // Allow any localhost/127.0.0.1 with any port for development
        const isLocal = origin.startsWith('http://localhost') ||
            origin.startsWith('http://127.0.0.1');

        if (isLocal || allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }

        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/custom-menu', require('./routes/customMenuRoutes'));
app.use('/api/live-stalls', require('./routes/liveStallRoutes'));

// Serve static assets in production (and development)
const path = require('path');
app.use(express.static(path.join(__dirname, '../seisuvai-react/dist')));

// Fallback to serve the React app index.html for client-side routing/SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../seisuvai-react/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
