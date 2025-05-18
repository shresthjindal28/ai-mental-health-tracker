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

const Assignment = {
  create: async ({ userId, title, description, dueDate, status }) => {
    const [result] = await db.execute(
      'INSERT INTO user_assignments (user_id, title, description, due_date, status) VALUES (?, ?, ?, ?, ?)',
      [userId, title, description, dueDate, status]
    );
    return result;
  },
  update: async ({ assignmentId, title, description, dueDate, status }) => {
    const [result] = await db.execute(
      'UPDATE user_assignments SET title = ?, description = ?, due_date = ?, status = ? WHERE assignment_id = ?',
      [title, description, dueDate, status, assignmentId]
    );
    return result;
  },
  delete: async (assignmentId) => {
    const [result] = await db.execute(
      'DELETE FROM user_assignments WHERE assignment_id = ?',
      [assignmentId]
    );
    return result;
  },
  findByUserId: async (userId) => {
    const [rows] = await db.execute(
      'SELECT * FROM user_assignments WHERE user_id = ? ORDER BY due_date ASC',
      [userId]
    );
    return rows;
  },
  findById: async (assignmentId) => {
    const [rows] = await db.execute(
      'SELECT * FROM user_assignments WHERE assignment_id = ?',
      [assignmentId]
    );
    return rows[0];
  }
};

const dummyAssignmentQuestions = [
  {
    question_id: 1,
    question_text: "What is the main goal of this assignment?",
    options: JSON.stringify([
      { value: "understand", label: "Understand the topic", score: 1 },
      { value: "practice", label: "Practice skills", score: 2 },
      { value: "review", label: "Review material", score: 3 }
    ])
  },
  {
    question_id: 2,
    question_text: "How confident do you feel about completing this assignment?",
    options: JSON.stringify([
      { value: "not_confident", label: "Not confident", score: 1 },
      { value: "somewhat_confident", label: "Somewhat confident", score: 2 },
      { value: "very_confident", label: "Very confident", score: 3 }
    ])
  }
];

// Assignment Response model
const AssignmentResponse = {
  saveResponse: async ({ assignmentId, questionId, answerValue }) => {
    const [result] = await db.execute(
      'INSERT INTO assignment_responses (assignment_id, question_id, answer_value) VALUES (?, ?, ?)',
      [assignmentId, questionId, answerValue]
    );
    return result;
  },
  getResponsesByAssignment: async (assignmentId) => {
    const [rows] = await db.execute(
      'SELECT * FROM assignment_responses WHERE assignment_id = ?',
      [assignmentId]
    );
    return rows;
  }
};

module.exports = {
  ...Assessment,
  Assignment,
  dummyAssignmentQuestions,
  AssignmentResponse
};
