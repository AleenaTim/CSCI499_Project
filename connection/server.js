const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('../userRoute');
const connectDB = require('./connectDB');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
connectDB();
const path = require("path");

// Routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
