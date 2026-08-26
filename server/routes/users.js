const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        username: username || undefined,
        email: email || undefined,
        updatedAt: Date.now(),
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update library settings
router.put('/settings', auth, async (req, res) => {
  try {
    const { defaultSort, itemsPerShelf, backgroundColor } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'librarySettings.defaultSort': defaultSort,
        'librarySettings.itemsPerShelf': itemsPerShelf,
        'librarySettings.backgroundColor': backgroundColor,
        updatedAt: Date.now(),
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
