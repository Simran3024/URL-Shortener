// server/routes/url.js
const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ Import middleware

// Helper for URL validation
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

// @route   POST /shorten
// @desc    Create a short URL (Authenticated)
router.post('/shorten', authMiddleware, async (req, res) => {
  const { longUrl } = req.body;
  const userId = req.user.id;

  if (!longUrl || !isValidUrl(longUrl)) {
    return res.status(400).json({ error: 'Please provide a valid URL.' });
  }

  try {
    let url = await Url.findOne({ longUrl, userId });

    if (url) {
      res.json(url);
    } else {
      url = new Url({
        longUrl,
        userId, // ✅ Store user ID for tracking
      });
      await url.save();
      res.status(201).json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:code
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (url) {
      url.clicks++;
      url.clickDetails.push({ ip: req.ip, timestamp: new Date() });
      await url.save();
      return res.redirect(url.longUrl); // ✅ redirect to original URL
    } else {
      return res.status(404).json({ error: 'No URL found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /stats/:code
// @desc    Get statistics for a short URL
router.get('/stats/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (url) {
      res.json({
        longUrl: url.longUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
        clickDetails: url.clickDetails, // ✅ Include detailed clicks
      });
    } else {
      return res.status(404).json({ error: 'No URL found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /my-urls
// @desc    Get paginated URLs for the logged-in user
router.get('/my-urls', authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const urls = await Url.find({ userId: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
