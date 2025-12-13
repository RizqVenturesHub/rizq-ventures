import axios from 'axios';

// Build a safe base URL from env - user may have provided the swagger-ui URL
const rawBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
let baseURL = rawBase.trim();
try {
  const u = new URL(baseURL);
  // If user pointed to the Swagger UI, trim to the origin (API root)
  if (u.pathname && u.pathname.includes('/swagger-ui')) {
    baseURL = `${u.protocol}//${u.host}`;
  }
} catch (e) {
  // If it's not a valid URL, fall back to default
  baseURL = baseURL || 'http://localhost:8080';
}

// Create axios instance with base URL
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Keep this file focused: axios instance and interceptors only.
