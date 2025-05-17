const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const { verifyToken } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { body } = require('express-validator');

// Protect all goal routes with authentication
router.use(verifyToken);

// Validation for goals
const goalValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('target_date')
    .optional()
    .isISO8601()
    .withMessage('Target date must be a valid date'),
  body('status')
    .isIn(['not_started', 'in_progress', 'completed', 'abandoned'])
    .withMessage('Status must be a valid value'),
  body('progress')
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100')
];

router.get('/', goalController.getUserGoals);
router.post('/', goalValidation, validate, goalController.createGoal);
router.put('/:goalId', goalValidation, validate, goalController.updateGoal);
router.delete('/:goalId', goalController.deleteGoal);

module.exports = router;
