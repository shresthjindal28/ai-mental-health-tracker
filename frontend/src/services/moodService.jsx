import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

const getMoodEntries = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/moods`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const addMoodEntry = async (moodData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/moods`, moodData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const getMoodStats = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/moods/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export default { getMoodEntries, addMoodEntry, getMoodStats };
