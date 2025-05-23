const Assessment = require('../models/assessmentModel');
const { Assignment, dummyAssignmentQuestions, AssignmentResponse } = require('../models/assessmentModel');

exports.getAssessmentTypes = async (req, res) => {
  try {
    const types = await Assessment.getTypes();
    res.json(types);
  } catch (err) {
    console.error('Error getting assessment types:', err);
    res.status(500).json({ error: 'Error getting assessment types', details: err.message });
  }
};

exports.getQuestionsByType = async (req, res) => {
  const { typeId } = req.params;
  
  try {
    const questions = await Assessment.getQuestionsByType(typeId);
    res.json(questions);
  } catch (err) {
    console.error('Error getting assessment questions:', err);
    res.status(500).json({ error: 'Error getting assessment questions', details: err.message });
  }
};

exports.submitAssessment = async (req, res) => {
  const userId = req.user.id;
  const { typeId, answers } = req.body;
  
  if (!typeId || !answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: 'Type ID and answers are required' });
  }
  
  try {
    // Get questions with weights
    const questions = await Assessment.getQuestionsByType(typeId);
    if (questions.length === 0) {
      return res.status(404).json({ error: 'Assessment type not found' });
    }
    
    // Calculate score based on answers and question weights
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const question of questions) {
      const answerId = question.question_id;
      const answerValue = answers[answerId];
      
      if (!answerValue) continue;
      
      // Parse options if they exist
      let optionScore = parseFloat(answerValue);
      
      if (question.options) {
        try {
          const options = JSON.parse(question.options);
          const option = options.find(opt => opt.value === answerValue);
          if (option && option.score !== undefined) {
            optionScore = parseFloat(option.score);
          }
        } catch (error) {
          console.error('Error parsing options:', error);
        }
      }
      
      const weight = question.weight || 1;
      totalScore += optionScore * weight;
      totalWeight += weight;
    }
    
    const finalScore = totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : 0;
    
    // Determine interpretation based on assessment type and score
    let interpretation = '';
    let recommendations = '';
    
    // Get assessment type details
    const assessmentType = await Assessment.getTypeById(typeId);
    
    if (assessmentType.name.includes('Depression')) {
      if (finalScore < 5) {
        interpretation = 'Minimal depression';
        recommendations = 'Continue with self-care and monitoring';
      } else if (finalScore < 10) {
        interpretation = 'Mild depression';
        recommendations = 'Consider lifestyle changes and self-help resources';
      } else if (finalScore < 15) {
        interpretation = 'Moderate depression';
        recommendations = 'Consider consulting with a mental health professional';
      } else {
        interpretation = 'Severe depression';
        recommendations = 'Please consult with a mental health professional soon';
      }
    } else if (assessmentType.name.includes('Anxiety')) {
      if (finalScore < 5) {
        interpretation = 'Minimal anxiety';
        recommendations = 'Continue with self-care and monitoring';
      } else if (finalScore < 10) {
        interpretation = 'Mild anxiety';
        recommendations = 'Consider relaxation techniques and stress management';
      } else if (finalScore < 15) {
        interpretation = 'Moderate anxiety';
        recommendations = 'Consider consulting with a mental health professional';
      } else {
        interpretation = 'Severe anxiety';
        recommendations = 'Please consult with a mental health professional soon';
      }
    } else {
      interpretation = `Score: ${finalScore}`;
      recommendations = 'Consider reviewing your results with a healthcare provider';
    }
    
    // Save assessment result
    const assessmentResult = await Assessment.saveAssessment({
      userId,
      typeId,
      score: finalScore,
      interpretation,
      recommendations
    });
    
    // Save individual answers
    for (const [questionId, answerValue] of Object.entries(answers)) {
      await Assessment.saveAnswer({
        assessmentId: assessmentResult.insertId,
        questionId,
        answerValue
      });
    }
    
    res.status(201).json({
      assessmentId: assessmentResult.insertId,
      score: finalScore,
      interpretation,
      recommendations
    });
  } catch (err) {
    console.error('Error submitting assessment:', err);
    res.status(500).json({ error: 'Error submitting assessment', details: err.message });
  }
};

exports.getUserAssessments = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const assessments = await Assessment.getUserAssessments(userId);
    res.json(assessments);
  } catch (err) {
    console.error('Error getting user assessments:', err);
    res.status(500).json({ error: 'Error getting user assessments', details: err.message });
  }
};

// Assignment CRUD
exports.getUserAssignments = async (req, res) => {
  const userId = req.user.id;
  try {
    const assignments = await Assignment.findByUserId(userId);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving assignments', details: err.message });
  }
};

exports.createAssignment = async (req, res) => {
  const userId = req.user.id;
  const { title, description, due_date, status } = req.body;
  try {
    const result = await Assignment.create({
      userId,
      title,
      description,
      dueDate: due_date,
      status
    });
    const newAssignment = await Assignment.findById(result.insertId);
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(500).json({ error: 'Error creating assignment', details: err.message });
  }
};

exports.updateAssignment = async (req, res) => {
  const userId = req.user.id;
  const { assignmentId } = req.params;
  const { title, description, due_date, status } = req.body;
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    if (assignment.user_id !== userId) return res.status(403).json({ error: 'Not authorized' });
    await Assignment.update({
      assignmentId,
      title,
      description,
      dueDate: due_date,
      status
    });
    const updated = await Assignment.findById(assignmentId);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating assignment', details: err.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  const userId = req.user.id;
  const { assignmentId } = req.params;
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    if (assignment.user_id !== userId) return res.status(403).json({ error: 'Not authorized' });
    await Assignment.delete(assignmentId);
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting assignment', details: err.message });
  }
};

exports.getAssignmentQuestions = async (req, res) => {
  // For demo, always return the dummy questions
  res.json(dummyAssignmentQuestions);
};

exports.submitAssignmentResponses = async (req, res) => {
  const userId = req.user.id;
  const { assignmentId, answers } = req.body;
  if (!assignmentId || !answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: 'Assignment ID and answers are required' });
  }
  try {
    // Optionally, check assignment belongs to user
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment || assignment.user_id !== userId) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    // Save each answer
    for (const [questionId, answerValue] of Object.entries(answers)) {
      await AssignmentResponse.saveResponse({
        assignmentId,
        questionId,
        answerValue
      });
    }
    res.status(201).json({ message: 'Assignment responses saved' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving assignment responses', details: err.message });
  }
};
