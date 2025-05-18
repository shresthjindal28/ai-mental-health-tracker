import axios from 'axios';

// Use the API URL from environment variable with consistent format
const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

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

const getUserAssignments = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/assessments/assignments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const createAssignment = async (assignmentData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/assessments/assignments`, assignmentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const updateAssignment = async (assignmentId, assignmentData) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_URL}/assessments/assignments/${assignmentId}`, assignmentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const deleteAssignment = async (assignmentId) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${API_URL}/assessments/assignments/${assignmentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export default { 
  getAssessmentTypes, 
  getAssessmentQuestions, 
  submitAssessment, 
  getUserAssessments,
  getUserAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
};
