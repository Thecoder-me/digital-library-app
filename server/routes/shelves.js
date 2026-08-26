const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get books by shelf
router.get('/:shelf', auth, async (req, res) => {
  try {
    const { shelf } = req.params;
    const validShelves = ['Fantasy', 'Romance', 'Religious', 'Mystery', 'Classics', 'Non-Fiction', 'To Be Read'];

    if (!validShelves.includes(shelf)) {
      return res.status(400).json({ error: 'Invalid shelf' });
    }

    const books = await Book.find({ userId: req.userId, shelf }).sort('position');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all shelves with book counts
router.get('/', auth, async (req, res) => {
  try {
    const shelves = ['Fantasy', 'Romance', 'Religious', 'Mystery', 'Classics', 'Non-Fiction', 'To Be Read'];
    const shelfData = {};

    for (const shelf of shelves) {
      const count = await Book.countDocuments({ userId: req.userId, shelf });
      shelfData[shelf] = count;
    }

    res.json(shelfData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update book position on shelf
router.put('/:shelfName/:bookId/position', auth, async (req, res) => {
  try {
    const { shelfName, bookId } = req.params;
    const { position } = req.body;

    const book = await Book.findOneAndUpdate(
      { _id: bookId, userId: req.userId },
      { position, shelf: shelfName, updatedAt: Date.now() },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
