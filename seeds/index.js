//run this file seperately from node app to seed database
const mongoose = require('mongoose');
const cities = require('./cities');
const { categories, descriptor } = require('./seedHelpers');
const methodOverride = require('method-override');
const Restaur = require('../models/restaurant');

//database name flavorflowdb
mongoose.connect('mongodb://localhost:27017/flavorflowdb'//, {
    //no longer supported options
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
    //}
);

const db = mongoose.connection; //help shorten code
//check for error
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    //on successful open
    console.log("Database connected");
});

const example = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Restaur.deleteMany({}); //delete entire database
    for (let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        //create restaurants 
        const rest = new Restaur({
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            name: `${example(descriptor)} ${example(categories)}`
        })
        await rest.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})