const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  place_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  vicinity: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  user_ratings_total: {
    type: Number
  },
  photos: [{
    photo_reference: String
  }],
  opening_hours: {
    open_now: Boolean
  }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;