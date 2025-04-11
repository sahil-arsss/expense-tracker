import axios from 'axios';

const API_URL = 'http://localhost:8000/api-v1/auth';

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/sign-in`, credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/sign-up`, userData);
  return response.data;
};