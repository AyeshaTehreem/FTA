const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../middleware/config'); // Adjust the path if necessary
const { authenticateToken } = require('../middleware/auth');
const Blog = require('../models/Blog');
const User = require('../models/User');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, content, categories } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Ensure only users with 'editor' role can create blog posts
    if (req.session.role !== 'editor') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const file = req.file;
    const fileExtension = path.extname(file.originalname);
    const fileName = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;
    
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    };
    
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Save blog post with image URL
    const blog = new Blog({
      title,
      content,
      imageUrl: fileName,
      authorId: req.session.userId,
      authorName: req.session.username,
      categories: JSON.parse(categories), // Assuming categories are sent as a JSON string
    });

    await blog.save();

    // Return the blog post with the constructed S3 URL
    res.status(201).json({
      ...blog._doc,
      imageUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Like a blog post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    const userLikeIndex = blog.likes.findIndex(like => like.userId.toString() === req.session.userId);
    
    if (userLikeIndex > -1) {
      // User has already liked, so remove the like (dislike)
      blog.likes.splice(userLikeIndex, 1);
    } else {
      // Add new like
      blog.likes.push({ userId: req.session.userId, userName: req.session.username });
    }

    await blog.save();
    res.json({ likes: blog.likes.length, userLiked: userLikeIndex === -1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Unlike a blog post
router.delete('/:id/unlike', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    const likeToRemove = blog.likes.find(like => like.userId.toString() === req.session.userId);
    if (!likeToRemove) return res.status(400).json({ message: 'Like not found' });

    await Blog.updateOne(
      { _id: req.params.id },
      { $pull: { likes: { _id: likeToRemove._id } } }
    );

    res.json({ message: 'Like removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//post commment
router.post('/:id/comment', authenticateToken, async (req, res) => {
  const { text } = req.body; // Ensure the comment text is provided

  // Check if comment text exists
  if (!text) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    blog.comments.push({
      userId: req.session.userId, // Get the user ID from session
      userName: req.session.username, // Get the username from session
      text,
    });

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().select('_id title imageUrl authorName content categories createdAt likes comments');
    const filteredBlogs = blogs.map(blog => ({
      _id: blog._id,
      title: blog.title,
      authorName: blog.authorName,
      categories: blog.categories,
      createdAt: blog.createdAt,
      content: blog.content,
      likes: blog.likes.length,
      comments: blog.comments.length + blog.comments.reduce((count, comment) => count + comment.replies.length, 0),
      imageUrl: blog.imageUrl // Keep this only if you're saving it in the database
    }));

    res.json(filteredBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//single blog
// GET single blog
// GET single blog with full comments
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Received request for blog ID:', id); // Log the ID

  try {
    // Fetch the blog with full comment details
    const blog = await Blog.findById(id)
      .select('_id title imageUrl authorName categories createdAt likes comments content');

    if (!blog) {
      console.log('Blog not found'); // Log when blog is not found
      return res.status(404).send('Blog not found');
    }

    // Return the full blog details, including all comments
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
});



// Get blogs of a certain category with initials
router.get('/category/:category', async (req, res) => {
  try {
    const blogs = await Blog.find({ categories: req.params.category })
      .select('title authorName categories createdAt likes comments');

    const filteredBlogs = blogs.map(blog => ({
      title: blog.title,
      authorName: blog.authorName,
      categories: blog.categories,
      createdAt: blog.createdAt,
      likes: blog.likes.length,
      comments: blog.comments.length + blog.comments.reduce((count, comment) => count + comment.replies.length, 0)
    }));

    res.json(filteredBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
