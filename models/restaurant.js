const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: String,
    type: String,
    location: String,
    price: String,
    description: String,
    category: String,
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);