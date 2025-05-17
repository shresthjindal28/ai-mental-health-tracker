import axios from 'axios';

// Use the API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

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