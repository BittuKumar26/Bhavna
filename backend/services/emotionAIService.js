// Emotion Detection and Suggestion Service
// This service analyzes text and detects emotions with activity suggestions

const emotionKeywords = {
  calm: {
    keywords: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'at peace', 'settled', 'quiet', 'composed', 'still', 'peaceful', 'zen', 'peaceful mind', 'relaxing', 'soothed', 'comfort', 'cozy'],
    phrases: ['feel calm', 'stay calm', 'peace of mind', 'feeling peaceful', 'very relaxed', 'nice and calm'],
    negativeIndicators: [],
    suggestions: ['meditation', 'breathing exercises', 'journaling', 'walking', 'swimming'],
  },
  happy: {
    keywords: ['happy', 'joyful', 'glad', 'delighted', 'cheerful', 'pleased', 'content', 'wonderful', 'great', 'amazing', 'excellent', 'fantastic', 'brilliant', 'lovely', 'blessed', 'grateful', 'celebrating', 'laughing', 'smile', 'joy'],
    phrases: ['feeling happy', 'so happy', 'very happy', 'made me happy', 'feel blessed', 'on cloud nine', 'walking on air'],
    negativeIndicators: ['but sad', 'but upset'],
    suggestions: ['dancing', 'gym', 'team sports', 'cycling', 'running', 'travelling'],
  },
  energetic: {
    keywords: ['energetic', 'excited', 'pumped', 'motivated', 'enthusiastic', 'active', 'lively', 'vibrant', 'dynamic', 'fired up', 'pumped up', 'revved', 'powerful', 'strong', 'energized', 'intense', 'unstoppable', 'charged'],
    phrases: ['feeling energetic', 'full of energy', 'so excited', 'very excited', 'pumped up', 'ready to go', 'get going'],
    negativeIndicators: [],
    suggestions: ['gym', 'running', 'cycling', 'dancing', 'team sports', 'swimming'],
  },
  irritated: {
    keywords: ['irritated', 'annoyed', 'frustrated', 'bothered', 'agitated', 'vexed', 'exasperated', 'touchy', 'grumpy', 'peeved', 'irksome', 'rankled', 'grating', 'nagging', 'bothering'],
    phrases: ['getting irritated', 'so annoyed', 'very frustrated', 'fed up', 'sick of', 'tired of'],
    negativeIndicators: [],
    suggestions: ['gym', 'running', 'boxing', 'breathing exercises', 'meditation', 'journaling'],
  },
  sad: {
    keywords: ['sad', 'unhappy', 'sorrowful', 'downhearted', 'melancholy', 'gloomy', 'miserable', 'blue', 'down', 'upset', 'mourning', 'grief', 'sorrow', 'doleful', 'wistful', 'tearful', 'weeping', 'lonesome'],
    phrases: ['feeling sad', 'so sad', 'very sad', 'heartbroken', 'feeling down', 'feeling low', 'not good'],
    negativeIndicators: [],
    suggestions: ['journaling', 'meditation', 'walking', 'team sports', 'talking with friends', 'travelling'],
  },
  depressed: {
    keywords: ['depressed', 'hopeless', 'worthless', 'empty', 'numb', 'despair', 'devastated', 'crushed', 'helpless', 'lost', 'suicidal', 'meaningless', 'void', 'broken', 'defeated', 'shattered'],
    phrases: ['feeling depressed', 'deep depression', 'no hope', 'can\'t go on', 'why live', 'can\'t handle it'],
    negativeIndicators: ['help needed'],
    suggestions: ['journaling', 'meditation', 'walking', 'breathing exercises', 'team sports', 'seek professional help'],
  },
  'low energy': {
    keywords: ['tired', 'exhausted', 'drained', 'fatigued', 'weak', 'lethargic', 'sluggish', 'worn out', 'depleted', 'lifeless', 'burned out', 'wiped', 'spent', 'zonked', 'beat', 'knackered'],
    phrases: ['feeling tired', 'so tired', 'very tired', 'no energy', 'completely exhausted', 'running on empty'],
    negativeIndicators: [],
    suggestions: ['meditation', 'walking', 'breathing exercises', 'yoga', 'journaling', 'light swimming'],
  },
  anxious: {
    keywords: ['anxious', 'nervous', 'worried', 'stressed', 'fearful', 'tense', 'panicked', 'uneasy', 'apprehensive', 'restless', 'jittery', 'edgy', 'uptight', 'wound up', 'frazzled', 'antsy', 'alarmed'],
    phrases: ['feeling anxious', 'so anxious', 'very stressed', 'worrying about', 'stressed out', 'panic attack', 'can\'t relax'],
    negativeIndicators: [],
    suggestions: ['breathing exercises', 'meditation', 'walking', 'yoga', 'journaling', 'gym'],
  },
  anger: {
    keywords: ['angry', 'furious', 'enraged', 'livid', 'mad', 'outraged', 'irate', 'incensed', 'infuriated', 'seething', 'fuming', 'boiling', 'wrathful', 'raging', 'hostile'],
    phrases: ['feeling angry', 'so angry', 'very angry', 'absolutely furious', 'want to scream', 'seeing red'],
    negativeIndicators: [],
    suggestions: ['gym', 'running', 'boxing', 'cycling', 'breathing exercises', 'journaling'],
  },
};

const detectEmotion = (text) => {
  const lowerText = text.toLowerCase();
  const emotionScores = {};

  // Score each emotion based on keywords and phrases
  for (const [emotion, data] of Object.entries(emotionKeywords)) {
    let score = 0;

    // Check keywords (each worth 1 point)
    const keywordMatches = data.keywords.filter(keyword => lowerText.includes(keyword)).length;
    score += keywordMatches;

    // Check phrases (each worth 3 points - more specific)
    const phraseMatches = data.phrases.filter(phrase => lowerText.includes(phrase)).length;
    score += phraseMatches * 3;

    // Penalize if negative indicators found
    const negativeMatches = data.negativeIndicators.filter(neg => lowerText.includes(neg)).length;
    score -= negativeMatches * 2;

    emotionScores[emotion] = Math.max(0, score);
  }

  // Get all emotions with score > 0, sorted by score (descending)
  const detectedEmotions = Object.entries(emotionScores)
    .filter(([_, score]) => score > 0)
    .map(([emotion, score]) => ({
      emotion,
      score,
      confidence: Math.min(100, (score / 5) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  // If no direct keywords matched, use sentiment analysis to enhance
  if (detectedEmotions.length === 0) {
    const sentimentEmotion = analyzeBasicSentiment(text);
    if (sentimentEmotion) {
      detectedEmotions.push({
        emotion: sentimentEmotion,
        score: 2,
        confidence: 45, // Lower confidence for fallback
      });
    }
  }

  // Return primary emotion and all detected emotions
  const primaryEmotion = detectedEmotions.length > 0 ? detectedEmotions[0] : { emotion: 'calm', confidence: 0 };
  return {
    emotion: primaryEmotion.emotion,
    emotions: detectedEmotions.length > 0 ? detectedEmotions : [],
    confidence: primaryEmotion.confidence,
    scores: emotionScores,
  };
};

const analyzeBasicSentiment = (text) => {
  const lowerText = text.toLowerCase();
  
  const positiveWords = ['good', 'great', 'excellent', 'wonderful', 'nice', 'love', 'amazing', 'perfect', 'beautiful', 'awesome', 'best', 'fantastic', 'brilliant', 'loved', 'proud', 'thankful', 'grateful', 'blessed'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'ugly', 'disgusting', 'pathetic', 'dreadful', 'atrocious', 'worse', 'useless'];
  const sadWords = ['sad', 'down', 'miserable', 'unhappy', 'sorry', 'disappointed', 'upset', 'crying', 'heartbroken'];
  const angryWords = ['angry', 'mad', 'furious', 'frustrated', 'annoyed', 'irritated', 'outraged'];
  
  const posCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negCount = negativeWords.filter(word => lowerText.includes(word)).length;
  const sadCount = sadWords.filter(word => lowerText.includes(word)).length;
  const angryCount = angryWords.filter(word => lowerText.includes(word)).length;

  // Return strongest sentiment, prioritizing explicit emotions
  if (sadCount > 0) return 'sad';
  if (angryCount > 0) return 'irritated';
  if (posCount > negCount && posCount > 0) return 'happy';
  if (negCount > posCount && negCount > 0) return 'sad';
  
  return null; // No clear sentiment found
};

const getSuggestions = (emotion) => {
  return emotionKeywords[emotion]?.suggestions || ['meditation', 'breathing exercises', 'walking'];
};

module.exports = {
  detectEmotion,
  getSuggestions,
};
