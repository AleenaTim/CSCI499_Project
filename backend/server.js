require('dotenv').config(); // Load environment variables at the top
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./connectDB');
const taskRoutes = require('./taskRoute');

const app = express();

// Connect to MongoDB
connectDB();
const path = require("path");


// app.use(express.static(path.join(__dirname, "build")));
// Middleware
// app.use(cors({
//   origin: 'https://mern-task-app-6bkv.onrender.com/', // Replace with your frontend's URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
))
app.options('*', cors())
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));