import axios from 'axios';

// Use the proxy configured in vite.config.js
const API_URL = '/api';

const createEntry = async (userId, entryText) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/journals`, {
    entryText
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const getEntries = async (userId) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/journals/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export default { createEntry, getEntries };