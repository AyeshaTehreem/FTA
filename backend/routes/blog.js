const express = require('express');
const Blog = require('../models/Blog');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Create a new blog post
router.post('/create', authenticateToken, async (req, res) => {
  const { title, content, categories, tags } = req.body;

  try {
    if (req.session.role !== 'editor') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const blog = new Blog({
      title,
      content,
      author: req.session.userId, // User ID from session
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
    if (blog.author.toString() !== req.session.userId) {
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

    // Check if the logged-in user is the author of the blog or an admin
    if (blog.author.toString() !== req.session.userId && req.session.role !== 'admin') {
      return res.status(403).send('Unauthorized action');
    }

    await blog.remove();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get blogs with only initial details
router.get('/initials', async (req, res) => {
  try {
    const blogs = await Blog.find().select('title author categories createdAt').populate('author', 'name email');
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get blogs of a certain category
router.get('/category/:category', async (req, res) => {
  try {
    const blogs = await Blog.find({ categories: req.params.category }).populate('author', 'name email');
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get blogs created by the logged-in user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.session.userId }).populate('author', 'name email');
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Like a blog post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    blog.likes.push({ user: req.session.userId });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Unlike a blog post
router.delete('/:id/unlike', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    blog.likes = blog.likes.filter(like => like.user.toString() !== req.session.userId);
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Comment on a blog post
router.post('/:id/comment', authenticateToken, async (req, res) => {
  const { text } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    blog.comments.push({ user: req.session.userId, text });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete a comment
router.delete('/:id/comment/:commentId', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    blog.comments = blog.comments.filter(comment => comment._id.toString() !== req.params.commentId || comment.user.toString() !== req.session.userId);
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Reply to a comment
router.post('/:id/comment/:commentId/reply', authenticateToken, async (req, res) => {
  const { text } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).send('Comment not found');

    comment.replies.push({ user: req.session.userId, text });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete a reply
router.delete('/:id/comment/:commentId/reply/:replyId', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).send('Comment not found');

    comment.replies = comment.replies.filter(reply => reply._id.toString() !== req.params.replyId || reply.user.toString() !== req.session.userId);
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
