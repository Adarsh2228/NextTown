const Post = require('../models/Post');
const Business = require('../models/Business');
const mongoose = require('mongoose');

exports.createPost = async (req, res) => {
  try {
    const { businessId, content } = req.body;

    // Validate input
    if (!businessId || !content) {
      return res.status(400).json({ error: 'Business ID and content are required.' });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ error: 'Invalid business ID' });
    }

    // Find the business by its ID
    const business = await Business.findById(businessId);
    
    if (!business) return res.status(404).json({ error: 'Business not found' });

    // Create a new post
    const newPost = new Post({
      business: business._id,
      content,
      images: [],
      videos: [],
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

// Endpoint to fetch all posts for any business
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    
    if (!posts.length) return res.status(404).json({ error: 'No posts found.' });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// Endpoint to fetch posts by business ID
exports.getPostsByBusiness = async (req, res) => {
  try {
    const businessId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ error: 'Invalid business ID' });
    }

    const posts = await Post.find({ business: businessId }).sort({ createdAt: -1 });
    
    if (!posts.length) return res.status(404).json({ error: 'No posts found for this business.' });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
};