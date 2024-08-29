const express = require('express');
const Category = require('../models/Category');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Create a new category
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update a category
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  const { name, description } = req.body;
  try {
    let category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('Category not found');

    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete a category
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('Category not found');

    await category.remove();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
