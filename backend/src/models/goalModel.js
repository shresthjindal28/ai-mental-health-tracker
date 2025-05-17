const db = require('./db');

const Goal = {
  findByUserId: async (userId) => {
    const [rows] = await db.execute(
      'SELECT * FROM user_goals WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },
  
  findById: async (goalId) => {
    const [rows] = await db.execute(
      'SELECT * FROM user_goals WHERE goal_id = ?',
      [goalId]
    );
    return rows[0];
  },
  
  create: async ({ userId, title, description, targetDate, status, progress }) => {
    const [result] = await db.execute(
      'INSERT INTO user_goals (user_id, title, description, target_date, status, progress) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, title, description, targetDate, status, progress]
    );
    return result;
  },
  
  update: async ({ goalId, title, description, targetDate, status, progress }) => {
    const [result] = await db.execute(
      'UPDATE user_goals SET title = ?, description = ?, target_date = ?, status = ?, progress = ? WHERE goal_id = ?',
      [title, description, targetDate, status, progress, goalId]
    );
    return result;
  },
  
  delete: async (goalId) => {
    const [result] = await db.execute(
      'DELETE FROM user_goals WHERE goal_id = ?',
      [goalId]
    );
    return result;
  }
};

module.exports = Goal;
