const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user theme settings
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('currentTheme themeSettings');
    res.json({
      currentTheme: user.currentTheme,
      themeSettings: user.themeSettings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update theme
router.put('/current/:theme', auth, async (req, res) => {
  try {
    const { theme } = req.params;
    const validThemes = ['darkAcademia', 'lightAcademia', 'romanticAcademia', 'chaosAcademia'];

    if (!validThemes.includes(theme)) {
      return res.status(400).json({ error: 'Invalid theme' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { currentTheme: theme, updatedAt: Date.now() },
      { new: true }
    ).select('currentTheme themeSettings');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update theme settings
router.put('/settings', auth, async (req, res) => {
  try {
    const { shelfStyle, lightingStyle, atmospherics, bookArrangement } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'themeSettings.shelfStyle': shelfStyle,
        'themeSettings.lightingStyle': lightingStyle,
        'themeSettings.atmospherics': atmospherics,
        'themeSettings.bookArrangement': bookArrangement,
        updatedAt: Date.now(),
      },
      { new: true }
    ).select('currentTheme themeSettings');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
