const Journal = require('../models/journalModel');
const { analyzeSentiment } = require('../utils/sentiment');

exports.createEntry = async (req, res) => {
  const userId = req.user.id; // Get userId from authenticated token
  const { entryText } = req.body;
  
  try {
    const { sentiment, score } = analyzeSentiment(entryText);
    const newEntry = await Journal.create({ userId, entryText, sentiment, emotionScore: score });
    
    res.status(201).json({ 
      message: 'Entry saved', 
      entryId: newEntry.insertId,
      sentiment, 
      score 
    });
  } catch (err) {
    console.error('Error saving journal entry:', err);
    res.status(500).json({ error: 'Error saving journal entry', details: err.message });
  }
};

exports.getEntriesByUser = async (req, res) => {
  const userId = req.user.id; // Get userId from authenticated token
  
  try {
    const entries = await Journal.findByUserId(userId);
    res.json(entries);
  } catch (err) {
    console.error('Error retrieving entries:', err);
    res.status(500).json({ error: 'Error retrieving entries', details: err.message });
  }
};

exports.getSentimentAnalysis = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const entries = await Journal.findByUserId(userId);
    
    // Calculate sentiment trends
    const sentiments = {
      positive: entries.filter(entry => entry.sentiment === 'Positive').length,
      neutral: entries.filter(entry => entry.sentiment === 'Neutral').length,
      negative: entries.filter(entry => entry.sentiment === 'Negative').length
    };
    
    // Calculate average emotion score
    const avgScore = entries.length > 0 
      ? entries.reduce((sum, entry) => sum + parseFloat(entry.emotion_score), 0) / entries.length
      : 0;
    
    res.json({
      totalEntries: entries.length,
      sentiments,
      averageScore: avgScore.toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ error: 'Error analyzing sentiment', details: err.message });
  }
};

