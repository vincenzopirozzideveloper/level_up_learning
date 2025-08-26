// Authentication Service for Laravel Sanctum
import axios from 'axios';

const API_URL = '/api'; // Nginx will forward to backend

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for Sanctum cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add CSRF token
api.interceptors.request.use(
  async (config) => {
    // Skip CSRF for certain endpoints
    if (config.url === '/sanctum/csrf-cookie') {
      return config;
    }
    
    // Get CSRF token if not present and backend is available
    try {
      if (!document.cookie.includes('XSRF-TOKEN')) {
        // Only try to get CSRF if we're making an actual API call
        if (config.url !== '/user') {
          await api.get('/sanctum/csrf-cookie').catch(() => {
            console.log('CSRF endpoint not available, continuing without it');
          });
        }
      }
    } catch (error) {
      console.log('CSRF token fetch failed, continuing anyway');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      localStorage.removeItem('user');
      // Only redirect if we're not already on auth pages
      if (!window.location.hash.includes('/auth/')) {
        window.location.href = '#/auth/sign-in';
      }
    }
    return Promise.reject(error);
  }
);

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      // Try to get CSRF cookie first (optional for development)
      await api.get('/sanctum/csrf-cookie').catch(() => {
        console.log('CSRF endpoint not available, continuing without it');
      });
      
      const response = await api.post('/v1/auth/register', userData);
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      // For development, simulate successful registration if backend is not available
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
        console.log('Backend not available, using mock registration');
        const mockUser = {
          id: 1,
          name: userData.name,
          email: userData.email,
          character_selected: false,
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { user: mockUser };
      }
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      // Try to get CSRF cookie first (optional for development)
      await api.get('/sanctum/csrf-cookie').catch(() => {
        console.log('CSRF endpoint not available, continuing without it');
      });
      
      const response = await api.post('/v1/auth/login', {
        email,
        password,
      });
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      // For development, simulate successful login if backend is not available
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
        console.log('Backend not available, using mock login');
        const mockUser = {
          id: 1,
          name: 'DevWarrior',
          email: email,
          character_selected: false,
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { user: mockUser };
      }
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/v1/auth/logout');
      localStorage.removeItem('user');
      window.location.href = '/auth/sign-in';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local data
      localStorage.removeItem('user');
      window.location.href = '/auth/sign-in';
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/v1/auth/me');
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is logged in
  isAuthenticated: () => {
    const user = localStorage.getItem('user');
    return !!user;
  },

  // Get user from localStorage
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Update user character selection
  updateCharacterSelection: async (characterData) => {
    try {
      const response = await api.post('/user/character', characterData);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
export { api };