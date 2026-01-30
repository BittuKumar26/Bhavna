import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name, email, password, confirmPassword) =>
    api.post('/auth/register', { name, email, password, confirmPassword }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const emotionAPI = {
  submitEmotion: (text) =>
    api.post('/emotion/submit', { text }),
  getHistory: (days = 30) =>
    api.get(`/emotion/history?days=${days}`),
  getStats: (days = 30) =>
    api.get(`/emotion/stats?days=${days}`),
  getTrends: (days = 30) =>
    api.get(`/emotion/trends?days=${days}`),
  deleteEmotion: (emotionId) =>
    api.delete(`/emotion/${emotionId}`),
};

export default api;
