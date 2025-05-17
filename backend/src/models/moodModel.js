const db = require('./db');

const Mood = {
  create: async ({ userId, moodScore, notes }) => {
    const [result] = await db.execute(
      'INSERT INTO mood_entries (user_id, mood_score, notes) VALUES (?, ?, ?)',
      [userId, moodScore, notes]
    );
    return result;
  },

  findByUserId: async (userId) => {
    const [rows] = await db.execute(
      'SELECT * FROM mood_entries WHERE user_id = ? ORDER BY recorded_at DESC',
      [userId]
    );
    return rows;
  },
  
  findByUserIdAndDateRange: async (userId, startDate, endDate) => {
    const [rows] = await db.execute(
      'SELECT * FROM mood_entries WHERE user_id = ? AND recorded_at BETWEEN ? AND ? ORDER BY recorded_at DESC',
      [userId, startDate, endDate]
    );
    return rows;
  }
};

module.exports = Mood;
