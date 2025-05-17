import axios from 'axios';

// Use the proxy configured in vite.config.js
const API_URL = '/api';

const getAssessmentTypes = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/assessments/types`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const getAssessmentQuestions = async (typeId) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/assessments/types/${typeId}/questions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const submitAssessment = async (typeId, answers) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/assessments/submit`, 
    { typeId, answers },
    { headers: { Authorization: `Bearer ${token}` }}
  );
  return res.data;
};

const getUserAssessments = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/assessments/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export default { 
  getAssessmentTypes, 
  getAssessmentQuestions, 
  submitAssessment, 
  getUserAssessments 
};
