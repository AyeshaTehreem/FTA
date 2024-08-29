const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // URL to the uploaded image
  status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who uploaded the image
  verifiers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of verifier IDs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model
