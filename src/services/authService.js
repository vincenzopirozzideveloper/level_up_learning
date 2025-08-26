// Authentication Service for Laravel Sanctum (Token-based)
import axios from 'axios';

const API_URL = '/api'; // Nginx will forward to backend

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add Bearer token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Add Bearer token if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      // Unauthorized - clear auth data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
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
      const response = await api.post('/v1/auth/register', userData);
      
      // Save token and user data
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
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
        localStorage.setItem('token', 'mock-token-123');
        return { user: mockUser, token: 'mock-token-123' };
      }
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/v1/auth/login', {
        email,
        password,
      });
      
      // Save token and user data
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
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
        localStorage.setItem('token', 'mock-token-123');
        return { user: mockUser, token: 'mock-token-123' };
      }
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Try to logout from backend
      await api.post('/v1/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '#/auth/sign-in';
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/v1/auth/me');
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      }
      return response.data;
    } catch (error) {
      // If can't get user, clear auth
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      throw error;
    }
  },

  // Check if user is logged in
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // Get user from localStorage
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Update user character selection
  updateCharacterSelection: async (characterData) => {
    try {
      const response = await api.post('/v1/user/character', characterData);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // Mock for development
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
        const user = authService.getUser();
        if (user) {
          user.character_selected = true;
          user.character = characterData;
          localStorage.setItem('user', JSON.stringify(user));
          return { user };
        }
      }
      throw error;
    }
  },
};

export default authService;
export { api };