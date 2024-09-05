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
      authorId: req.session.userId,
      authorName: req.session.username,
      categories,
      tags,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Like a blog post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    if (blog.likes.some(like => like.user.toString() === req.session.userId)) {
      return res.status(400).json({ message: 'Already liked' });
    }

    blog.likes.push({ user: req.session.userId, userName: req.session.username });
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

    blog.comments.push({ user: req.session.userId, userName: req.session.username, text });
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

    comment.replies.push({ user: req.session.userId, userName: req.session.username, text });
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

// Get all blogs posts with initials
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .select('title authorName categories createdAt likes comments');
      

    // Map through blogs to include the counts of likes and comments + replies
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
    res.status(500).send('Server error');
  }
});

// Get a single blog post by ID with full details
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    res.json(blog);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get blogs of a certain category with initials
router.get('/category/:category', async (req, res) => {
  try {
    const blogs = await Blog.find({ categories: req.params.category })
      .select('title authorName categories createdAt likes comments');

    // Map through blogs to include the counts of likes and comments + replies
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
    res.status(500).send('Server error');
  }
});

// Get all blogs of the logged-in user with initials
router.get('/blogs/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Retrieve all blogs of the user with initials only
    const blogs = await Blog.find({ authorId: userId })
      .select('title authorName categories createdAt likes comments');

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blog posts found for this user' });
    }

    // Map through blogs to return only the desired attributes
    const filteredBlogs = blogs.map(blog => ({
      title: blog.title,
      authorName: blog.authorName,
      categories: blog.categories,
      createdAt: blog.createdAt,
      likes: blog.likes.length,
      comments: blog.comments.length + blog.comments.reduce((count, comment) => count + comment.replies.length, 0)
    }));

    res.status(200).json(filteredBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
