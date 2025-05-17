const Goal = require('../models/goalModel');

exports.getUserGoals = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const goals = await Goal.findByUserId(userId);
    res.json(goals);
  } catch (err) {
    console.error('Error retrieving goals:', err);
    res.status(500).json({ error: 'Error retrieving goals', details: err.message });
  }
};

exports.createGoal = async (req, res) => {
  const userId = req.user.id;
  const { title, description, target_date, status, progress } = req.body;
  
  try {
    const result = await Goal.create({
      userId,
      title,
      description,
      targetDate: target_date,
      status,
      progress
    });
    
    const newGoal = await Goal.findById(result.insertId);
    res.status(201).json(newGoal);
  } catch (err) {
    console.error('Error creating goal:', err);
    res.status(500).json({ error: 'Error creating goal', details: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  const userId = req.user.id;
  const { goalId } = req.params;
  const { title, description, target_date, status, progress } = req.body;
  
  try {
    // Check if goal exists and belongs to user
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    if (goal.user_id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this goal' });
    }
    
    await Goal.update({
      goalId,
      title,
      description,
      targetDate: target_date,
      status,
      progress
    });
    
    const updatedGoal = await Goal.findById(goalId);
    res.json(updatedGoal);
  } catch (err) {
    console.error('Error updating goal:', err);
    res.status(500).json({ error: 'Error updating goal', details: err.message });
  }
};

exports.deleteGoal = async (req, res) => {
  const userId = req.user.id;
  const { goalId } = req.params;
  
  try {
    // Check if goal exists and belongs to user
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    if (goal.user_id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this goal' });
    }
    
    await Goal.delete(goalId);
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ error: 'Error deleting goal', details: err.message });
  }
};
