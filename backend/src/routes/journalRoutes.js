const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const { verifyToken } = require('../middleware/authMiddleware');
const { journalEntryValidation, validate } = require('../middleware/validationMiddleware');
const { journalLimiter } = require('../middleware/rateLimitMiddleware');

// Protect all journal routes with authentication
router.use(verifyToken);

router.post('/', journalLimiter, journalEntryValidation, validate, journalController.createEntry);
router.get('/:userId', journalController.getEntriesByUser); // Changed to match frontend
router.get('/user', journalController.getEntriesByUser);    // Keep the original for compatibility
router.get('/analysis', journalController.getSentimentAnalysis);

module.exports = router;