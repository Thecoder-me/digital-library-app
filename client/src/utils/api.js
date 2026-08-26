import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth API
export const authAPI = {
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

// Books API
export const booksAPI = {
  getAll: (genre, status, sort) =>
    api.get('/books', { params: { genre, status, sort } }),
  getById: (id) => api.get(`/books/${id}`),
  create: (book) => api.post('/books', book),
  update: (id, book) => api.put(`/books/${id}`, book),
  delete: (id) => api.delete(`/books/${id}`),
  search: (query) => api.get(`/books/search/${query}`),
};

// Shelves API
export const shelvesAPI = {
  getAllShelves: () => api.get('/shelves'),
  getShelf: (shelf) => api.get(`/shelves/${shelf}`),
  updateBookPosition: (shelf, bookId, position) =>
    api.put(`/shelves/${shelf}/${bookId}/position`, { position }),
};

// Themes API
export const themesAPI = {
  getThemes: () => api.get('/themes'),
  setTheme: (theme) => api.put(`/themes/current/${theme}`),
  updateSettings: (settings) => api.put('/themes/settings', settings),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profile) => api.put('/users/profile', profile),
  updateSettings: (settings) => api.put('/users/settings', settings),
};

export default api;
