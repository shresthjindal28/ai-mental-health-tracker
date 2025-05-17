import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MoodTracker from '../components/MoodTracker';
import journalService from '../services/journalService';
import moodService from '../services/moodService';
import goalService from '../services/goalService';
import { FaBook, FaChartLine, FaRobot, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [recentEntries, setRecentEntries] = useState([]);
  const [moodStats, setMoodStats] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [entriesData, moodData, goalsData] = await Promise.all([
          journalService.getEntries(user.id),
          moodService.getMoodStats(),
          goalService.getUserGoals()
        ]);
        setRecentEntries(entriesData.slice(0, 3));
        setMoodStats(moodData);
        setGoals(goalsData.slice(0, 3));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleMoodSubmit = () => {
    moodService.getMoodStats().then(data => setMoodStats(data));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Welcome, {user.firstName ? user.firstName : user.username}!
          </h1>
          <div className="text-sm text-indigo-200 bg-gray-800 px-4 py-2 rounded-lg shadow">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
            <MoodTracker onMoodSubmit={handleMoodSubmit} />
          
          <div className="bg-gradient-to-br from-indigo-900 to-gray-900 rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-200">Mood Overview</h3>
            {moodStats ? (
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-indigo-300">Average mood this week:</span>
                  <span className="font-bold text-indigo-100">{moodStats.weeklyAverage}/10</span>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-indigo-300">Mood trend:</span>
                  <span className={`font-bold ${
                    moodStats.trend > 0 ? 'text-green-400' : moodStats.trend < 0 ? 'text-red-400' : 'text-indigo-200'
                  }`}>
                    {moodStats.trend > 0 ? '↑ Improving' : moodStats.trend < 0 ? '↓ Declining' : '→ Stable'}
                  </span>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-indigo-300">Entries this week:</span>
                  <span className="font-bold text-indigo-100">{moodStats.entriesThisWeek}</span>
                </div>
              </div>
            ) : (
              <p className="text-indigo-300">Start tracking your mood to see statistics.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link to="/journal" className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
            <div className="flex items-center">
              <FaBook className="mr-3 text-2xl" />
              <span className="text-lg font-semibold">Journal Entries</span>
            </div>
            <p className="mt-2 text-blue-100">Record your thoughts and feelings</p>
          </Link>
          <Link to="/assessments" className="bg-gradient-to-r from-purple-700 to-pink-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
            <div className="flex items-center">
              <FaClipboardList className="mr-3 text-2xl" />
              <span className="text-lg font-semibold">Assessments</span>
            </div>
            <p className="mt-2 text-purple-100">Check your mental health</p>
          </Link>
          <Link to="/ai-chat" className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
            <div className="flex items-center">
              <FaRobot className="mr-3 text-2xl" />
              <span className="text-lg font-semibold">AI Chat</span>
            </div>
            <p className="mt-2 text-green-100">Talk with our AI assistant</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-200">Recent Journal Entries</h3>
              <Link to="/journal" className="text-indigo-400 hover:text-indigo-200 text-sm">View All</Link>
            </div>
            {recentEntries.length > 0 ? (
              <div className="space-y-3">
                {recentEntries.map((entry, idx) => (
                  <div key={idx} className="p-4 bg-gray-900 bg-opacity-60 rounded-lg border border-indigo-800">
                    <p className="text-indigo-100 line-clamp-2">
                      {entry.entry_text.substring(0, 100)}
                      {entry.entry_text.length > 100 ? '...' : ''}
                    </p>
                    <div className="mt-2 text-xs flex justify-between">
                      <span className="text-indigo-400">{new Date(entry.entry_date).toLocaleDateString()}</span>
                      <span className={`font-medium 
                        ${entry.sentiment === 'Positive' ? 'text-green-400' : 
                          entry.sentiment === 'Negative' ? 'text-red-400' : 'text-indigo-300'}`}>
                        {entry.sentiment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-indigo-300">No journal entries yet. Start writing!</p>
            )}
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-200">Goals</h3>
              <Link to="/goals" className="text-indigo-400 hover:text-indigo-200 text-sm">View All</Link>
            </div>
            {goals.length > 0 ? (
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div key={goal.goal_id} className="p-4 bg-gray-900 bg-opacity-60 rounded-lg border border-indigo-800">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-indigo-100">{goal.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        goal.status === 'completed' ? 'bg-green-900 text-green-300' :
                        goal.status === 'in_progress' ? 'bg-blue-900 text-blue-300' :
                        'bg-gray-800 text-indigo-200'
                      }`}>
                        {goal.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-indigo-400 mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-indigo-900 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-indigo-300">No goals set yet. Create some goals to track your progress!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
