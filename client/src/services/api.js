// ============================================
// api.js - Axios Instance with Auth Interceptor
// ============================================
// Creates a reusable Axios instance that auto-attaches
// the JWT token to every request.
// ============================================

import axios from 'axios';

// Production → uses Vercel environment variable
// Local development → falls back to localhost
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'http://localhost:5000/api';

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;