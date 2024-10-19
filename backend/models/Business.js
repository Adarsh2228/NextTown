// src/models/business.js
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  category: { type: String, required: true },
  businessName: { type: String, required: true },
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  shopAddress: { type: String, required: true },
  shopWebsite: { type: String },
  shopDescription: { type: String, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

// Use `mongoose.models` to prevent overwriting
const Business = mongoose.models.Business || mongoose.model('Business', businessSchema);

module.exports = Business;
