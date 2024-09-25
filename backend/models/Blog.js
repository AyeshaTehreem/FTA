const mongoose = require('mongoose');

// Define the like schema
const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Updated field
  userName: { type: String, required: true }, // New field for user's name
  createdAt: { type: Date, default: Date.now }
});

// Define the comment schema
const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Updated field
  userName: { type: String, required: true }, // New field for user's name
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Updated field
    userName: { type: String, required: true }, // New field for user's name
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
});

// Define the blog schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  categories: [{ type: String }],
  likes: [likeSchema],
  comments: [commentSchema],
  imageUrl: { type: String }, // Add image URL field
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Blog', blogSchema);
