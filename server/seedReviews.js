require('dotenv').config();
const mongoose = require('mongoose');
const Review = require('./models/Review');

const dummyReviews = [
    { name: "Arjun Mehta", rating: 5, comment: "Exceptional service and the food was divine. The biryani was the star of the evening!", eventType: "Wedding" },
    { name: "Priya Sharma", rating: 4, comment: "Very professional team. Everything was set up on time and guests loved the appetizers.", eventType: "Corporate" },
    { name: "Karthik Raja", rating: 5, comment: "Authentic Brahmin Sadhya. Felt like a grand feast at home. Highly recommended.", eventType: "Family Function" },
    { name: "Sneha Reddy", rating: 5, comment: "The fusion buffet was a great hit at our housewarming party. Amazing quality.", eventType: "Other" },
    { name: "Vikram Singh", rating: 4, comment: "Great taste and excellent presentation. We will definitely book again.", eventType: "Corporate" },
    { name: "Ananya Iyer", rating: 5, comment: "Every dish was cooked to perfection. The sweets were particularly outstanding!", eventType: "Wedding" },
    { name: "Rahul Deshmukh", rating: 5, comment: "The traditional morning feast was a delightful experience. The Ghee Pongal was perfect.", eventType: "Family Function" },
    { name: "Meera Nair", rating: 4, comment: "Professional service for our corporate lunch. The menu was well-balanced and healthy.", eventType: "Corporate" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for seeding...');
        await Review.deleteMany();
        await Review.insertMany(dummyReviews);
        console.log('Reviews seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
