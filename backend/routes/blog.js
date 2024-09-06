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

    // Check if the user has already liked the blog
    const alreadyLiked = blog.likes.some(like => like.userId === req.session.userId);
    if (alreadyLiked) {
      return res.status(400).json({ message: 'Already liked' });
    }

    // Add the like
    blog.likes.push({ userId: req.session.userId, userName: req.session.username });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/:id/unlike', authenticateToken, async (req, res) => {
  try {
    // Find the blog by its ID
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    // Find the like object to remove
    const likeToRemove = blog.likes.find(like => like.userId.toString() === req.session.userId);
    if (!likeToRemove) return res.status(400).json({ message: 'Like not found' });

    // Remove the like object by its _id
    await Blog.updateOne(
      { _id: req.params.id },
      { $pull: { likes: { _id: likeToRemove._id } } }
    );

    res.json({ message: 'Like removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Comment on a blog post
router.post('/:id/comment', authenticateToken, async (req, res) => {
  const { text } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    blog.comments.push({ userId: req.session.userId, userName: req.session.username, text });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment
router.delete('/:id/comment/:commentId', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    // Find the comment object to remove
    const commentIndex = blog.comments.findIndex(comment => 
      comment._id.toString() === req.params.commentId && 
      comment.userId.toString()  === req.session.userId
    );

    if (commentIndex === -1) {
      return res.status(400).json({ message: 'Comment not found or user not authorized' });
    }

    // Remove the comment object by its index
    blog.comments.splice(commentIndex, 1);
    await blog.save();

    res.json({ message: 'Comment removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    comment.replies.push({ userId: req.session.userId, userName: req.session.username, text });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a reply
router.delete('/:id/comment/:commentId/reply/:replyId', authenticateToken, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).send('Comment not found');

    // Find the reply to remove
    const replyToRemove = comment.replies.find(reply => reply._id.toString() === req.params.replyId && reply.userId.toString() === req.session.userId);
    if (!replyToRemove) return res.status(400).json({ message: 'Reply not found or user not authorized' });

    // Remove the reply object by its _id
    await Blog.updateOne(
      { _id: req.params.id, 'comments._id': req.params.commentId },
      { $pull: { 'comments.$.replies': { _id: replyToRemove._id } } }
    );

    res.json({ message: 'Reply removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

// Get a single blog post by ID with full details
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
