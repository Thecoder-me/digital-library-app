const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  currentTheme: {
    type: String,
    enum: ['darkAcademia', 'lightAcademia', 'romanticAcademia', 'chaosAcademia'],
    default: 'darkAcademia',
  },
  themeSettings: {
    shelfStyle: {
      type: String,
      enum: ['wood1', 'wood2', 'wood3', 'metal', 'modern'],
      default: 'wood1',
    },
    lightingStyle: {
      type: String,
      enum: ['candlelight', 'natural', 'lamp', 'ambient'],
      default: 'candlelight',
    },
    atmospherics: {
      type: Boolean,
      default: true,
    },
    bookArrangement: {
      type: String,
      enum: ['organized', 'chaotic', 'mixed'],
      default: 'organized',
    },
  },
  librarySettings: {
    defaultSort: {
      type: String,
      enum: ['genre', 'title', 'author', 'rating', 'dateAdded', 'status'],
      default: 'genre',
    },
    itemsPerShelf: {
      type: Number,
      default: 8,
    },
    backgroundColor: String,
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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
