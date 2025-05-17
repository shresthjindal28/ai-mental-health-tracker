const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { verifyToken } = require('../middleware/authMiddleware');

// Protect all assessment routes with authentication
router.use(verifyToken);

router.get('/types', assessmentController.getAssessmentTypes);
router.get('/types/:typeId/questions', assessmentController.getQuestionsByType);
router.post('/submit', assessmentController.submitAssessment);
router.get('/user', assessmentController.getUserAssessments);

module.exports = router;
