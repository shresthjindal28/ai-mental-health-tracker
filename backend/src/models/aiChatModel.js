const db = require('./db');

const AiChat = {
  getConversations: async (userId) => {
    const [rows] = await db.execute(
      'SELECT * FROM ai_conversations WHERE user_id = ? ORDER BY last_message_at DESC',
      [userId]
    );
    return rows;
  },
  
  getConversationById: async (conversationId) => {
    const [rows] = await db.execute(
      'SELECT * FROM ai_conversations WHERE conversation_id = ?',
      [conversationId]
    );
    return rows[0];
  },
  
  createConversation: async (userId) => {
    const [result] = await db.execute(
      'INSERT INTO ai_conversations (user_id) VALUES (?)',
      [userId]
    );
    return result;
  },
  
  updateConversationTimestamp: async (conversationId) => {
    const [result] = await db.execute(
      'UPDATE ai_conversations SET last_message_at = NOW() WHERE conversation_id = ?',
      [conversationId]
    );
    return result;
  },
  
  getMessages: async (conversationId) => {
    const [rows] = await db.execute(
      'SELECT * FROM ai_messages WHERE conversation_id = ? ORDER BY sent_at',
      [conversationId]
    );
    return rows;
  },
  
  getMessageById: async (messageId) => {
    const [rows] = await db.execute(
      'SELECT * FROM ai_messages WHERE message_id = ?',
      [messageId]
    );
    return rows[0];
  },
  
  createMessage: async ({ conversationId, sender, messageText, sentimentAnalysis }) => {
    const [result] = await db.execute(
      'INSERT INTO ai_messages (conversation_id, sender, message_text, sentiment_analysis) VALUES (?, ?, ?, ?)',
      [conversationId, sender, messageText, sentimentAnalysis]
    );
    return result;
  }
};

module.exports = AiChat;
