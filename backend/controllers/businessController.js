const Business = require('../models/business');
const User = require('../models/User');
const Post = require('../models/Post');
const Order = require('../models/Order');
const mongoose = require('mongoose');

// Register a new business
exports.registerBusiness = async (req, res) => {
  const { businessName, category, username, phoneNumber, email, shopAddress, shopDescription } = req.body;

  // Validate required fields
  if (!businessName || !category || !username || !phoneNumber || !email || !shopAddress || !shopDescription) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newBusiness = new Business({
    businessName,
    category,
    username,
    phoneNumber,
    email,
    shopAddress,
    shopDescription
  });

  try {
    const savedBusiness = await newBusiness.save();
    res.status(201).json({ _id: savedBusiness._id, ...savedBusiness.toObject() }); // Respond with created business and its ID
  } catch (error) {
    console.error('Error registering business:', error);
    res.status(500).json({ error: 'Error registering business' });
  }
};
exports.getBusinessProfile = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid business ID' });
  }

  try {
    const business = await Business.findById(id)
      .populate('followers')
      .populate('posts')
      .populate('orders');
    
    if (!business) return res.status(404).json({ error: 'Business not found' });
    
    res.json(business);
  } catch (error) {
    console.error('Error fetching business profile:', error);
    res.status(500).json({ error: 'Error fetching business profile' });
  }
};


// Fetch business by name
exports.getBusinessByName = async (req, res) => {
  const { name } = req.params;

  try {
    const business = await Business.findOne({ businessName: name });
    
    if (!business) return res.status(404).json({ error: 'Business not found' });

    res.json(business); // Returns the business object including _id
  } catch (error) {
    console.error('Error fetching business by name:', error);
    res.status(500).json({ error: 'Error fetching business' });
  }
};

// Follow a business
exports.followBusiness = async (req, res) => {
  const { id } = req.params;
  
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid business ID' });
  }

  try {
    const business = await Business.findById(id);
    const user = await User.findById(req.body.userId);
    
    if (!business || !user) return res.status(404).json({ error: 'Business or User not found' });
    
    if (business.followers.includes(user._id)) {
      return res.status(400).json({ error: 'User already follows this business' });
    }

    business.followers.push(user._id);
    await business.save();
    
    res.json(business);
  } catch (error) {
    console.error('Error following business:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error following business' });
  }
};

// Create a new post for a business
exports.createPost = async (req, res) => {
  const { businessId, content } = req.body;

  // Validate input
  if (!businessId || !content) {
      return res.status(400).json({ error: 'Business ID and content are required.' });
   }

   // Validate ObjectId
   if (!mongoose.Types.ObjectId.isValid(businessId)) {
     return res.status(400).json({ error: 'Invalid business ID' });
   }

   try {
     const business = await Business.findById(businessId);
     if (!business) return res.status(404).json({ error: 'Business not found' });

     const newPost = new Post({
       business: business._id,
       content,
     });

     // Handle media uploads
     if (req.file) {
       if (req.file.mimetype.startsWith('image/')) {
         newPost.images.push(req.file.path); // Store image path
       } else if (req.file.mimetype.startsWith('video/')) {
         newPost.videos.push(req.file.path); // Store video path
       }
     }

     // Save the post to the database
     await newPost.save();

     // Update the business to include the new post
     business.posts.push(newPost._id);
     await business.save();

     // Send the created post as a response
     res.status(201).json(newPost);
   } catch (error) {
     console.error('Error creating post:', error);
     res.status(500).json({ error: 'Error creating post' });
   }
};

// Create a new order for a business
exports.createOrder = async (req, res) => {
   const { id } = req.params;

   // Validate ObjectId
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid business ID' });
   }

   try {
      const business = await Business.findById(id);
      
      if (!business) return res.status(404).json({ error: 'Business not found' });

      const newOrder = new Order({
        ...req.body,
        businessId: id // Associate order with the business using its ID
      });

      business.orders.push(newOrder._id); // Add order to the business's orders array
    
      await newOrder.save(); // Save the order
      await business.save(); // Save the updated business
    
      res.status(201).json(newOrder); // Respond with created order and status 201
   } catch (error) {
      console.error('Error creating order:', error); // Log the error for debugging
      res.status(500).json({ error: 'Error creating order' });
   }
};

// Fetch all businesses
exports.getAllBusinesses = async (req, res) => {
   try {
      const businesses = await Business.find();
      
      if (!businesses.length) return res.status(404).json({ error: 'No businesses found' });
      
      res.json(businesses);
   } catch (error) {
      console.error('Error fetching businesses:', error); // Log the error for debugging
      res.status(500).json({ error: 'Error fetching businesses' });
   }
};