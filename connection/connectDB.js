const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect('mongodb+srv://aleenatim:mongodb123!@csci499.cderg.mongodb.net/', {
      useNewUrlParser: true,
  useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;