import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://wellness-platform-api.fly.dev';
const API_KEY = localStorage.getItem('apiKey') || import.meta.env.VITE_DEFAULT_API_KEY || '';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const setApiKey = (key) => {
  localStorage.setItem('apiKey', key);
  api.defaults.headers.Authorization = `Bearer ${key}`;
};


export const getClients = () => api.get('/api/clients');
export const getClient = (id) => api.get(`/api/clients/${id}`);
export const createClient = (data) => api.post('/api/clients', data);
export const updateClient = (id, data) => api.put(`/api/clients/${id}`, data);


export const getAppointments = () => api.get('/api/appointments');
export const getAppointment = (id) => api.get(`/api/appointments/${id}`);
export const createAppointment = (data) => api.post('/api/appointments', data);
export const updateAppointment = (id, data) => api.put(`/api/appointments/${id}`, data);

export default api;
