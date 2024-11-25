const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors package

const port = 5001; // Run server on port 5000
const app = express();

// Dynamically allow credentials for all origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5001/api/restaurants'];

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
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'], // Allow these headers
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));


// Set up a route for fetching restaurants from Google Places API
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

  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});