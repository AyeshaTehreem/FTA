const express = require('express');
const { Verification, Report } = require('../models/Verification');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Upload image for verification
router.post('/upload', authenticateToken, async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const verifiers = await User.find({ role: 'verifier' }, '_id');
    const verification = new Verification({
      imageUrl,
      user: req.session.userId,
      verifiers: verifiers.map(verifier => verifier._id),
    });
    await verification.save();
    res.status(201).json(verification);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// View pending images (Verifiers Only)
router.get('/pending', authenticateToken, async (req, res) => {
  if (req.session.role !== 'verifier') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }
  
  try {
    const verifications = await Verification.find({
      'verifications.verifier': { $ne: req.session.userId }
    }).populate('user', 'username email');

    res.json(verifications);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// Verifier response to verification
router.post('/:id/respond', authenticateToken, async (req, res) => {
  const { response } = req.body;
  if (req.session.role !== 'verifier') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }
  try {
    const verification = await Verification.findById(req.params.id);
    if (!verification) return res.status(404).send('Verification request not found');

    const verifierResponse = {
      verifier: req.session.userId,
      response,
    };
    verification.verifications.push(verifierResponse);
    await verification.save();

    // Check if all verifiers have responded
    if (verification.verifiers.length === verification.verifications.length) {
      // Generate a report
      const report = new Report({
        verification: verification._id,
        responses: verification.verifications,
      });
      await report.save();

      // Update verification status based on majority response
      const realResponses = verification.verifications.filter(v => v.response === 'Real').length;
      const fakeResponses = verification.verifications.filter(v => v.response === 'Fake').length;
      verification.status = realResponses > fakeResponses ? 'Verified' : 'Rejected';
      await verification.save();
    }

    res.json(verification);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/reports', authenticateToken, async (req, res) => {
  try {
    // Fetch all reports where the logged-in user is the creator of the verification request
    const reports = await Report.find({ 'verification.user': req.session.userId })
                                .populate('verification', 'imageUrl status')
                                .populate('responses.verifier', 'username email');
                                
    if (reports.length === 0) {
      return res.status(404).json({ message: 'No reports found' });
    }

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


module.exports = router;
