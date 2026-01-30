const express = require('express');
const emotionController = require('../controllers/emotionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/submit', emotionController.submitEmotion);
router.get('/history', emotionController.getEmotionHistory);
router.get('/stats', emotionController.getEmotionStats);
router.get('/trends', emotionController.getDailyEmotionTrend);
router.delete('/:emotionId', emotionController.deleteEmotion);

module.exports = router;
