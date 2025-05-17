const Mood = require('../models/moodModel');

exports.createMoodEntry = async (req, res) => {
  const userId = req.user.id;
  const { mood_score, notes } = req.body;
  
  try {
    const result = await Mood.create({
      userId,
      moodScore: mood_score,
      notes: notes || null
    });
    
    res.status(201).json({
      message: 'Mood entry created successfully',
      entryId: result.insertId
    });
  } catch (err) {
    console.error('Error creating mood entry:', err);
    res.status(500).json({ error: 'Error creating mood entry', details: err.message });
  }
};

exports.getMoodEntries = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const entries = await Mood.findByUserId(userId);
    res.json(entries);
  } catch (err) {
    console.error('Error retrieving mood entries:', err);
    res.status(500).json({ error: 'Error retrieving mood entries', details: err.message });
  }
};

exports.getMoodStats = async (req, res) => {
  const userId = req.user.id;
  
  try {
    // Get entries from last 30 days
    const entries = await Mood.findByUserIdAndDateRange(
      userId, 
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
      new Date()
    );
    
    // Get entries from last 7 days
    const lastWeekEntries = entries.filter(entry => {
      const entryDate = new Date(entry.recorded_at);
      return (Date.now() - entryDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
    });
    
    // Calculate weekly average
    const weeklyAverage = lastWeekEntries.length > 0 
      ? (lastWeekEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / lastWeekEntries.length).toFixed(1)
      : 0;
    
    // Calculate trend (comparing first half of week to second half)
    let trend = 0;
    if (lastWeekEntries.length >= 2) {
      const midpoint = Math.floor(lastWeekEntries.length / 2);
      const firstHalf = lastWeekEntries.slice(0, midpoint);
      const secondHalf = lastWeekEntries.slice(midpoint);
      
      const firstHalfAvg = firstHalf.reduce((sum, entry) => sum + entry.mood_score, 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((sum, entry) => sum + entry.mood_score, 0) / secondHalf.length;
      
      trend = secondHalfAvg - firstHalfAvg;
    }
    
    res.json({
      weeklyAverage,
      trend,
      entriesThisWeek: lastWeekEntries.length,
      totalEntries: entries.length
    });
  } catch (err) {
    console.error('Error getting mood stats:', err);
    res.status(500).json({ error: 'Error getting mood stats', details: err.message });
  }
};
