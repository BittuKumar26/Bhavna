const mongoose = require('mongoose');

const emotionEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  emotion: {
    type: String,
    enum: ['calm', 'happy', 'energetic', 'irritated', 'sad', 'depressed', 'low energy', 'anxious', 'anger'],
    required: true,
  },
  suggestions: {
    type: [String],
    default: [],
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    default: 5,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EmotionEntry', emotionEntrySchema);
