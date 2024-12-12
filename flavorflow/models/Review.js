const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    restaurantId: String,
    userName: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
