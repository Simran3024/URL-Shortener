// server/models/Url.js

const mongoose = require('mongoose');
const shortid = require('shortid');

// Schema to store individual click details
const ClickSchema = new mongoose.Schema({
  ip: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Main URL schema
const UrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate
  },
  clicks: {
    type: Number,
    default: 0
  },
  clickDetails: [ClickSchema], // ✅ Store IP + timestamp of each click
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'                // ✅ Reference to the user who created this URL
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', UrlSchema);
