const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationResponseSchema = new Schema({
  verifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  response: { type: String, enum: ['Real', 'Fake'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const verificationSchema = new Schema({
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verifiers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  verifications: [verificationResponseSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const reportSchema = new Schema({
  verification: { type: mongoose.Schema.Types.ObjectId, ref: 'Verification', required: true },
  responses: [verificationResponseSchema],
  createdAt: { type: Date, default: Date.now },
});

const Verification = mongoose.model('Verification', verificationSchema);
const Report = mongoose.model('Report', reportSchema);

module.exports = { Verification, Report };
