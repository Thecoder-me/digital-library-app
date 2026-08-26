const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: ['Fantasy', 'Romance', 'Religious', 'Mystery', 'Classics', 'Non-Fiction', 'Science Fiction', 'Thriller', 'Biography', 'Other'],
    required: true,
  },
  coverImage: {
    type: String, // URL or base64 encoded image
    default: null,
  },
  description: String,
  status: {
    type: String,
    enum: ['To Be Read', 'Currently Reading', 'Finished', 'Did Not Finish', 'Re-reading'],
    default: 'To Be Read',
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  personalNotes: String,
  tags: [{
    type: String,
  }],
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateStarted: Date,
  dateFinished: Date,
  shelf: {
    type: String,
    enum: ['Fantasy', 'Romance', 'Religious', 'Mystery', 'Classics', 'Non-Fiction', 'To Be Read'],
    default: 'To Be Read',
  },
  position: {
    type: Number,
    default: 0,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', bookSchema);
