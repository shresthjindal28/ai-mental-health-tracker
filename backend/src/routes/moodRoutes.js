const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const { verifyToken } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { body } = require('express-validator');

// Protect all mood routes with authentication
router.use(verifyToken);

// Validation for mood entries
const moodValidation = [
  body('mood_score')
    .isInt({ min: 1, max: 10 })
    .withMessage('Mood score must be between 1 and 10'),
  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string')
];

router.post('/', moodValidation, validate, moodController.createMoodEntry);
router.get('/', moodController.getMoodEntries);
router.get('/stats', moodController.getMoodStats);

module.exports = router;
