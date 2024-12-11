const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  savedRestaurants:[String]
});

const FormDataModel = mongoose.model('users', FormDataSchema);

module.exports = FormDataModel;
