import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api-v1', // Replace with your backend URL
});

// Attach the token for authenticated requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const signup = (userData) => API.post('/auth/sign-up', userData);
export const login = (credentials) => API.post('/auth/sign-in', credentials); 

export default API;
