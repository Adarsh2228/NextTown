const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// Register a new business
router.post('/register', businessController.registerBusiness);

// Get business profile by ID
router.get('/:id', businessController.getBusinessProfile);

// Follow a business
router.post('/:id/follow', businessController.followBusiness);

// Create a new post for a business
router.post('/:id/posts', businessController.createPost);

// Create a new order for a business
router.post('/:id/orders', businessController.createOrder);

// Fetch all businesses
router.get('/', businessController.getAllBusinesses);

module.exports = router; // Ensure this exports the router correctly