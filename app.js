const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Restaur = require('./models/restaurant');

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

const app = express();

//middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//tell express to parse body
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaur.find({});
    res.render('restaurants/index', { restaurants })
})

app.get('/restaurants/new', (req, res) => {
    res.render('restaurants/new');
})

app.post('/restaurants', async (req, res) => {
    const restaurant = new Restaur(req.body.restaurant);
    await restaurant.save();
    res.redirect(`/restaurants/${restaurant._id}`)
})

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaur.findById(req.params.id)
    res.render('restaurants/show', { restaurant });
})

app.get('/restaurants/:id/edit', async(req, res) => {
    const restaurant = await Restaur.findById(req.params.id)
    res.render('restaurants/edit', {restaurant});
})

app.put('/restaurants/:id', async (req,res)=>{
    const {id} = req.params;
    const restaurant = await Restaur.findByIdAndUpdate(id,{...req.body.restaurant});
    res.redirect(`/restaurants/${restaurant._id}`)
})

app.delete('/restaurants/:id', async (req,res)=>{
    const {id} = req.params;
    await Restaur.findByIdAndDelete(id);
    res.redirect('/restaurants');
})

app.listen(4500, () => {
    console.log('Serving on port 4500')
})