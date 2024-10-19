const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const postRoutes = require('./routes/postRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
const mlRoutes = require('./routes/mlRoutes');
const { loadModel } = require('./utils/mlModel');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection setup (update if necessary)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(error => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Load the ML model when the server starts (ensure this function is defined correctly)
loadModel()
  .then(() => {
    console.log('ML Model loaded successfully');
  })
  .catch((err) => {
    console.error('Error loading the ML Model:', err);
  });

// API route handlers (ensure these routes are defined correctly)
app.use('/api/users', userRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ml', mlRoutes);

// Catch all undefined routes and return a 404 response.
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Global error handling middleware.
app.use((err, req, res) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start the server and listen on the configured port.
const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});