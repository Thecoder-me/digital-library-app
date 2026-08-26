const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all books for user
router.get('/', auth, async (req, res) => {
  try {
    const { genre, status, sort } = req.query;
    let query = { userId: req.userId };

    if (genre) query.genre = genre;
    if (status) query.status = status;

    let books = await Book.find(query);

    // Sort books
    if (sort === 'title') {
      books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'author') {
      books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sort === 'rating') {
      books.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'dateAdded') {
      books.sort((a, b) => b.dateAdded - a.dateAdded);
    } else if (sort === 'status') {
      books.sort((a, b) => a.status.localeCompare(b.status));
    } else {
      books.sort((a, b) => a.genre.localeCompare(b.genre));
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single book
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, userId: req.userId });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add book
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, genre, coverImage, description, shelf } = req.body;

    const book = new Book({
      userId: req.userId,
      title,
      author,
      genre: genre || 'Other',
      coverImage,
      description,
      shelf: shelf || 'To Be Read',
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update book
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, userId: req.userId });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const { title, author, genre, status, rating, personalNotes, tags, dateStarted, dateFinished, shelf, coverImage } = req.body;

    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (status) book.status = status;
    if (rating !== undefined) book.rating = rating;
    if (personalNotes !== undefined) book.personalNotes = personalNotes;
    if (tags) book.tags = tags;
    if (dateStarted) book.dateStarted = dateStarted;
    if (dateFinished) book.dateFinished = dateFinished;
    if (shelf) book.shelf = shelf;
    if (coverImage) book.coverImage = coverImage;

    book.updatedAt = Date.now();
    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Search books
router.get('/search/:query', auth, async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const books = await Book.find({
      userId: req.userId,
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { author: { $regex: searchQuery, $options: 'i' } },
        { tags: { $regex: searchQuery, $options: 'i' } },
      ],
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
