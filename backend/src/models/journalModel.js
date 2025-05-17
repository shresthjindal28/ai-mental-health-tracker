const db = require('./db');

const Journal = {
  create: async ({ userId, entryText, sentiment, emotionScore }) => {
    const [result] = await db.execute(
      'INSERT INTO journal_entries (user_id, content, sentiment_score, ai_analysis, created_at) VALUES (?, ?, ?, ?, NOW())',
      [userId, entryText, emotionScore, sentiment]
    );
    return result;
  },

  findByUserId: async (userId) => {
    const [rows] = await db.execute(
      'SELECT *, content as entry_text, sentiment_score as emotion_score, DATE(created_at) as entry_date, ai_analysis as sentiment FROM journal_entries WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }
};

module.exports = Journal;