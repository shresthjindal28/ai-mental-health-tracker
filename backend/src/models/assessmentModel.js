const db = require('./db');

const Assessment = {
  getTypes: async () => {
    const [rows] = await db.execute('SELECT * FROM assessment_types');
    return rows;
  },
  
  getTypeById: async (typeId) => {
    const [rows] = await db.execute(
      'SELECT * FROM assessment_types WHERE type_id = ?',
      [typeId]
    );
    return rows[0];
  },
  
  getQuestionsByType: async (typeId) => {
    const [rows] = await db.execute(
      'SELECT * FROM assessment_questions WHERE type_id = ? ORDER BY question_id',
      [typeId]
    );
    return rows;
  },
  
  saveAssessment: async ({ userId, typeId, score, interpretation, recommendations }) => {
    const [result] = await db.execute(
      'INSERT INTO user_assessments (user_id, type_id, score, interpretation, recommendations) VALUES (?, ?, ?, ?, ?)',
      [userId, typeId, score, interpretation, recommendations]
    );
    return result;
  },
  
  saveAnswer: async ({ assessmentId, questionId, answerValue }) => {
    const [result] = await db.execute(
      'INSERT INTO assessment_answers (assessment_id, question_id, answer_value) VALUES (?, ?, ?)',
      [assessmentId, questionId, answerValue]
    );
    return result;
  },
  
  getUserAssessments: async (userId) => {
    const [rows] = await db.execute(
      `SELECT ua.assessment_id, ua.user_id, ua.type_id, at.name as assessment_name, 
              ua.score, ua.interpretation, ua.recommendations, ua.completed_at
       FROM user_assessments ua
       JOIN assessment_types at ON ua.type_id = at.type_id
       WHERE ua.user_id = ?
       ORDER BY ua.completed_at DESC`,
      [userId]
    );
    return rows;
  }
};

module.exports = Assessment;
