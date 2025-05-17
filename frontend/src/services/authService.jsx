import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Use the API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register`, userData);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  }
  return res.data;
};

const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/auth/login`, credentials);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  }
  return res.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token expired
        logout();
        return null;
      }
    } catch (e) {
      logout();
      return null;
    }
  }
  
  return JSON.parse(userStr);
};

const isAuthenticated = () => {
  return !!getCurrentUser();
};

export default { register, login, logout, getCurrentUser, isAuthenticated };
