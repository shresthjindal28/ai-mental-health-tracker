import React, { useState } from 'react';
import { FaRegSmile, FaSmile, FaMeh, FaFrown, FaSadCry } from 'react-icons/fa';
import moodService from '../services/moodService';

const MoodTracker = ({ onMoodSubmit }) => {
  const [moodScore, setMoodScore] = useState(0);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { score: 2, icon: <FaSadCry size={32} />, label: 'Very Bad' },
    { score: 4, icon: <FaFrown size={32} />, label: 'Bad' },
    { score: 6, icon: <FaMeh size={32} />, label: 'Neutral' },
    { score: 8, icon: <FaSmile size={32} />, label: 'Good' },
    { score: 10, icon: <FaRegSmile size={32} />, label: 'Very Good' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moodScore === 0) return;
    
    try {
      setIsSubmitting(true);
      const moodData = { mood_score: moodScore, notes };
      const result = await moodService.addMoodEntry(moodData);
      setNotes('');
      setMoodScore(0);
      if (onMoodSubmit) onMoodSubmit(result);
    } catch (error) {
      console.error('Error submitting mood:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 p-8 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-indigo-200 text-center tracking-tight">
        How are you feeling today?
      </h3>
      <div className="flex justify-between items-center mb-8">
        {moods.map((mood) => (
          <button
            key={mood.score}
            onClick={() => setMoodScore(mood.score)}
            type="button"
            className={`flex flex-col items-center p-3 rounded-full transition-all duration-200 border-2
              ${moodScore === mood.score
                ? 'text-yellow-300 bg-indigo-800 border-yellow-400 scale-110 shadow-lg'
                : 'text-indigo-300 border-transparent hover:text-yellow-200 hover:bg-indigo-800/60 hover:border-indigo-600'}
            `}
          >
            <div className="mb-1">{mood.icon}</div>
            <span className="text-xs">{mood.label}</span>
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-indigo-200 mb-2">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            rows="2"
            placeholder="Add some notes about how you're feeling..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={moodScore === 0 || isSubmitting}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg shadow-lg transition-all duration-200
            ${moodScore === 0 || isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}
          `}
        >
          {isSubmitting ? 'Saving...' : 'Save Mood'}
        </button>
      </form>
    </div>
  );
};

export default MoodTracker;
