const express = require('express');
const router = express.Router();
const aiChatController = require('../controllers/aiChatController');
const { verifyToken } = require('../middleware/authMiddleware');

// Protect all AI chat routes with authentication
router.use(verifyToken);

router.get('/conversations', aiChatController.getConversations);
router.get('/conversations/:conversationId/messages', aiChatController.getMessages);
router.post('/conversations', aiChatController.createConversation);
router.post('/messages', aiChatController.sendMessage);

module.exports = router;
