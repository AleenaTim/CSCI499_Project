const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors package
const path = require('path');

const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData.js');
const Restaurant = require('./models/Restaurant');
const { PORT, mongoDBURL } = require('./config.js');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000; // Run server on port 5000
const app = express();
app.use(express.json());
// Dynamically allow credentials for all origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000', 'https://flavorflow-ovph.onrender.com', ' http://localhost:'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, headers, etc.)
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'], // Allow these headers
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));


// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

mongoose.connect('mongodb+srv://aleenatim:mongodb123!@csci499.cderg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const SECRET = 'your_secret_key'; // Replace with a secure secret key
  
  // Middleware to authenticate JWT token
  const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ 
            error: 'Authentication required',
            message: 'Access denied'
        });
    }
  
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                error: 'Invalid token',
                message: 'Please log in again'
            });
        }
        req.user = user;
        next();
    });
  };
  
  // Login Route (Update to return token)
  app.post('/login', (req, res) => {
      const { email, password } = req.body;
      FormDataModel.findOne({ email }).then((user) => {
          if (!user || user.password !== password) {
              return res.status(400).json('Invalid Credentials');
          }
  
          const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
              expiresIn: '1h',
          });
          res.json({ token });
      });
  });
  
  // Get User Data
  app.get('/user', authenticateToken, (req, res) => {
      FormDataModel.findById(req.user.id).then((user) => {
          if (!user) return res.status(404).json('User Not Found');
          res.json({ 
            username: user.username,
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email,                  
          });
      });
  });
  


app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(users => res.json(users))
            .catch(err => res.json(err))
        }
    });
});

// Save a restaurant
app.post('/user/saved-restaurants', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const restaurantData = req.body.restaurant; // This will be the restaurant card data

    // First, save or update the restaurant in the Restaurant collection
    await Restaurant.findOneAndUpdate(
      { place_id: restaurantData.place_id },
      restaurantData,
      { upsert: true, new: true }
    );

    // Then, add the place_id to the user's savedRestaurants array
    const updatedUser = await FormDataModel.findByIdAndUpdate(
      userId,
      { $addToSet: { savedRestaurants: restaurantData.place_id } },
      { new: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save restaurant' });
  }
});

// Get user's saved restaurants
app.get('/user/saved-restaurants', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await FormDataModel.findById(userId);
    const restaurants = await Restaurant.find({
      place_id: { $in: user.savedRestaurants }
    });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saved restaurants' });
  }
});

// Remove a restaurant from saved list
app.delete('/user/saved-restaurants/:place_id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { place_id } = req.params;

    const updatedUser = await FormDataModel.findByIdAndUpdate(
      userId,
      { $pull: { savedRestaurants: place_id } },
      { new: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove restaurant' });
  }
});

// fetching restaurants from Google Places API
app.get('/api/restaurants', async (req, res) => {
    const { lat, lng, radius, keyword, type = 'restaurant' } = req.query;
    
    if (!lat || !lng || !radius) {
      return res.status(400).json({ error: 'Missing required parameters: lat, lng, and radius are required' });
    }
  const API_KEY = 'AIzaSyCFN565EdWOPCGPr4nbdla6PAJZUY4F_h8';
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

  console.log('Sending request to Google API:', {
    location: `${lat},${lng}`,
    radius: radius,
    keyword: keyword,
    type: type,
    key: API_KEY
  });

  try {
    const response = await axios.get(url, {
      params: {
        location: `${lat},${lng}`, // Example: "40.834326,-73.85674"
        radius: radius,            // Example: 5000 (meters)
        keyword: keyword || '',    // Search query, like "halal" could be used for the filter
        type: type,                // Type of place, like "restaurant"
        key: API_KEY               // Your Google Places API key
      }
    });

    if (response.data.status === 'OK') {
      res.json(response.data);
    } else {
      res.status(400).json({ error: response.data.status });
    }
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Places API' });
  }
});

app.get('/api/restaurants/next', async (req, res) => {
  const { nextPageToken } = req.query;

  if (!nextPageToken) {
      return res.status(400).json({ error: 'Missing required parameter: nextPageToken' });
  }
  const API_KEY = 'AIzaSyCFN565EdWOPCGPr4nbdla6PAJZUY4F_h8';
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

  try {
      // Fetch next page of results
      const response = await axios.get(url, {
          params: {
              pagetoken: nextPageToken,
              key: API_KEY,
          },
      });

      res.json(response.data);
  } catch (error) {
      console.error('Error fetching next page data from Google Places API:', error);
      res.status(500).json({ error: 'Failed to fetch data from Google Places API' });
  }
});

app.get('/api/restaurant/details', async (req, res) => {
  const { place_id } = req.query;

  //console.log('Fetching restaurant details for place_id in server:', place_id);

  if (!place_id) {
    return res.status(400).json({ error: 'Missing required parameter: place_id' });
  }
  const API_KEY = 'AIzaSyCFN565EdWOPCGPr4nbdla6PAJZUY4F_h8';
  const url = `https://maps.googleapis.com/maps/api/place/details/json`;

  try {
    // Fetch restaurant details
    const response = await axios.get(url, {
      params: {
        place_id: place_id,
        key: API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      res.json(response.data);
    } else {
      res.status(400).json({ error: response.data.status });
    }
  } catch (error) {
    console.error('Error fetching restaurant details from Google Places API:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant details from Google Places API' });
  }
});

  app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
  }

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});