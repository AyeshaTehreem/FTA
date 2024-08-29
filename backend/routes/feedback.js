const express = require('express');
const Feedback = require('../models/Feedback');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Add a comment to a blog post
router.post('/:blogId/comment', authenticateToken, async (req, res) => {
  const { comment } = req.body;
  try {
    const feedback = new Feedback({
      blog: req.params.blogId,
      user: req.user.id,
      comment,
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add a like to a blog post
router.post('/:blogId/like', authenticateToken, async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ blog: req.params.blogId, user: req.user.id });
    if (feedback) {
      feedback.likes += 1;
      await feedback.save();
    } else {
      const newFeedback = new Feedback({
        blog: req.params.blogId,
        user: req.user.id,
        likes: 1,
      });
      await newFeedback.save();
    }
    res.status(200).json({ message: 'Liked successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Report a blog post
router.post('/:blogId/report', authenticateToken, async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ blog: req.params.blogId, user: req.user.id });
    if (feedback) {
      feedback.reports += 1;
      await feedback.save();
    } else {
      const newFeedback = new Feedback({
        blog: req.params.blogId,
        user: req.user.id,
        reports: 1,
      });
      await newFeedback.save();
    }
    res.status(200).json({ message: 'Reported successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add a suggestion for a blog post
router.post('/:blogId/suggestion', authenticateToken, async (req, res) => {
  const { suggestion } = req.body;
  try {
    const feedback = new Feedback({
      blog: req.params.blogId,
      user: req.user.id,
      suggestion,
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get feedback for a blog post
router.get('/:blogId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ blog: req.params.blogId }).populate('user', 'name');
    res.json(feedback);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
