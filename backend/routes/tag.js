const express = require('express');
const Tag = require('../models/Tag');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Create a new tag
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update a tag
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    let tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).send('Tag not found');

    tag.name = name || tag.name;
    await tag.save();
    res.json(tag);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete a tag
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).send('Tag not found');

    await tag.remove();
    res.json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
