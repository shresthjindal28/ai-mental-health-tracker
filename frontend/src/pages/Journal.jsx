import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import journalService from '../services/journalService';
import JournalCard from '../components/JournalCard';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [entryText, setEntryText] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await journalService.getEntries(user.id);
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entryText.trim()) return;
    
    try {
      await journalService.createEntry(user.id, entryText);
      setEntryText('');
      fetchEntries();
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) fetchEntries();
  }, [user, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-gray-100 font-sans flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
          Your Journal
        </h2>
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            className="w-full p-4 rounded-lg bg-gray-900 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-3"
            rows="5"
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            placeholder="Write about your day..."
            required
          ></textarea>
          <button
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
            type="submit"
          >
            Submit Entry
          </button>
        </form>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-indigo-200">Previous Entries</h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : entries.length > 0 ? (
            <div className="space-y-4">
              {entries.map((entry, idx) => (
                <JournalCard key={idx} entry={entry} />
              ))}
            </div>
          ) : (
            <p className="text-indigo-300">No entries yet. Start journaling to see your entries here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
