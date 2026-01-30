const { emotions } = require('../storage/storage');
const emotionAIService = require('../services/emotionAIService');

const submitEmotion = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.userId;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Text input is required' });
    }

    // Detect emotion using AI service
    const detectionResult = emotionAIService.detectEmotion(text);
    const emotion = detectionResult.emotion;
    const emotions_list = detectionResult.emotions || [];
    const confidence = detectionResult.confidence;
    const suggestions = emotionAIService.getSuggestions(emotion);

    // Create emotion entry
    const emotionEntry = emotions.create({
      userId,
      text,
      emotion,
      emotions: emotions_list,
      confidence,
      suggestions,
    });

    res.status(201).json({
      message: 'Emotion recorded successfully',
      emotionEntry: {
        id: emotionEntry._id,
        emotion: emotionEntry.emotion,
        emotions: emotionEntry.emotions || [],
        confidence: emotionEntry.confidence,
        suggestions: emotionEntry.suggestions,
        timestamp: emotionEntry.timestamp,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record emotion', error: error.message });
  }
};

const getEmotionHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { days = 30 } = req.query;

    const entries = emotions.findByUserId(userId, parseInt(days));

    res.status(200).json({
      message: 'Emotion history retrieved',
      entries,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve history', error: error.message });
  }
};

const getEmotionStats = async (req, res) => {
  try {
    const userId = req.userId;
    const { days = 30 } = req.query;

    const entries = emotions.findByUserId(userId, parseInt(days));

    // Calculate emotion frequency
    const emotionFreq = {};
    
    entries.forEach(entry => {
      emotionFreq[entry.emotion] = (emotionFreq[entry.emotion] || 0) + 1;
    });

    // Get most common emotion
    const mostCommonEmotion = Object.keys(emotionFreq).length > 0 
      ? Object.keys(emotionFreq).reduce((a, b) => emotionFreq[a] > emotionFreq[b] ? a : b)
      : 'N/A';

    res.status(200).json({
      message: 'Emotion statistics retrieved',
      stats: {
        totalEntries: entries.length,
        emotionFrequency: emotionFreq,
        mostCommonEmotion,
        period: `${days} days`,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve stats', error: error.message });
  }
};

const getDailyEmotionTrend = async (req, res) => {
  try {
    const userId = req.userId;
    const { days = 30 } = req.query;

    const entries = emotions.findByUserId(userId, parseInt(days));

    // Group by date and emotion
    const trendData = {};
    
    entries.forEach(entry => {
      const dateStr = entry.timestamp.split('T')[0];
      if (!trendData[dateStr]) {
        trendData[dateStr] = {};
      }
      trendData[dateStr][entry.emotion] = (trendData[dateStr][entry.emotion] || 0) + 1;
    });

    // Format data for line chart with emotions as separate lines
    const allEmotions = new Set();
    Object.values(trendData).forEach(dayData => {
      Object.keys(dayData).forEach(emotion => allEmotions.add(emotion));
    });

    const chartData = Object.entries(trendData).map(([date, emotionCounts]) => {
      const dataPoint = { date };
      allEmotions.forEach(emotion => {
        dataPoint[emotion] = emotionCounts[emotion] || 0;
      });
      return dataPoint;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({
      message: 'Daily emotion trend retrieved',
      trendData: chartData,
      emotions: Array.from(allEmotions),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve trend', error: error.message });
  }
};

const deleteEmotion = async (req, res) => {
  try {
    const { emotionId } = req.params;
    const userId = req.userId;

    if (!emotionId) {
      return res.status(400).json({ message: 'Emotion ID is required' });
    }

    // Delete emotion entry
    const deleted = emotions.delete(emotionId, userId);

    if (!deleted) {
      return res.status(404).json({ message: 'Emotion entry not found' });
    }

    res.status(200).json({
      message: 'Emotion entry deleted successfully',
      deletedId: emotionId,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete emotion', error: error.message });
  }
};

module.exports = {
  submitEmotion,
  getEmotionHistory,
  getEmotionStats,
  getDailyEmotionTrend,
  deleteEmotion,
};
