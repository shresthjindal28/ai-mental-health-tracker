import axios from 'axios';

// Use the proxy configured in vite.config.js
const API_URL = '/api';

const getUserGoals = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/goals`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const createGoal = async (goalData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/goals`, goalData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const updateGoal = async (goalId, goalData) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_URL}/goals/${goalId}`, goalData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const deleteGoal = async (goalId) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${API_URL}/goals/${goalId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export default { getUserGoals, createGoal, updateGoal, deleteGoal };
