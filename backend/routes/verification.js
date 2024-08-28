const express = require('express');
const Verification = require('../models/Verification');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Upload image for verification
router.post('/upload', authenticateToken, async (req, res) => {
  const { imageUrl } = req.body; // You might use a service like AWS S3 to store images
  try {
    const verification = new Verification({
      imageUrl,
      user: req.user.id,
    });
    await verification.save();
    res.status(201).json(verification);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Assign verifiers to the request
router.put('/:id/assign-verifiers', authenticateToken, async (req, res) => {
  const { verifiers } = req.body; // Array of verifier IDs
  try {
    const verification = await Verification.findById(req.params.id);
    if (!verification) return res.status(404).send('Verification request not found');

    verification.verifiers = verifiers;
    await verification.save();
    res.json(verification);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update the verification status
router.put('/:id/update-status', authenticateToken, async (req, res) => {
  const { status } = req.body; // 'Verified' or 'Rejected'
  try {
    let verification = await Verification.findById(req.params.id);
    if (!verification) return res.status(404).send('Verification request not found');

    verification.status = status;
    verification.updatedAt = new Date();
    await verification.save();
    res.json(verification);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get all verification requests (for admin or verifiers)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const verifications = await Verification.find().populate('user', 'name email');
    res.json(verifications);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get a single verification request by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const verification = await Verification.findById(req.params.id).populate('user', 'name email');
    if (!verification) return res.status(404).send('Verification request not found');
    res.json(verification);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
