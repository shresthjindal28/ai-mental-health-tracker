import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

const getConversations = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/ai/conversations`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const getConversationMessages = async (conversationId) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/ai/conversations/${conversationId}/messages`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const startNewConversation = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/ai/conversations`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const sendMessage = async (conversationId, messageText) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/ai/messages`, 
    { conversationId, messageText }, 
    { headers: { Authorization: `Bearer ${token}` }}
  );
  return res.data;
};

export default { 
  getConversations, 
  getConversationMessages, 
  startNewConversation, 
  sendMessage 
};
