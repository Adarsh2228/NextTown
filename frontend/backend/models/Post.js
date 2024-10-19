const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [{
     type: String,
     default: [],
   }],
   videos: [{
     type: String,
     default: [],
   }],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);