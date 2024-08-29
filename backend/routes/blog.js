const express = require('express');
const Blog = require('../models/Blog');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Create a new blog post//
router.post('/create', authenticateToken, async (req, res) => {
  const { title, content, categories, tags } = req.body;
  try {
    const blog = new Blog({
      title,
      content,
      author: req.user.id,  // User ID from JWT
      categories,
      tags,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get all blogs posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email');
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) return res.status(404).send('Blog not found');
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update a blog post
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, content, categories, tags } = req.body;
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized action');
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.categories = categories || blog.categories;
    blog.tags = tags || blog.tags;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete a blog post
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized action');
    }

    await blog.remove();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
