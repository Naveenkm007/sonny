import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })

        const { access_token } = response.data
        localStorage.setItem('access_token', access_token)

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return api(originalRequest)

      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  refreshToken: () => api.post('/auth/refresh'),
}

// Students API
export const studentsAPI = {
  getAll: (params = {}) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  getResults: (id, params = {}) => api.get(`/students/${id}/results`, { params }),
  getClasses: () => api.get('/students/classes'),
}

// Subjects API
export const subjectsAPI = {
  getAll: (params = {}) => api.get('/subjects', { params }),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
  getResults: (id, params = {}) => api.get(`/subjects/${id}/results`, { params }),
}

// Results API
export const resultsAPI = {
  getAll: (params = {}) => api.get('/results', { params }),
  getById: (id) => api.get(`/results/${id}`),
  create: (data) => api.post('/results', data),
  update: (id, data) => api.put(`/results/${id}`, data),
  delete: (id) => api.delete(`/results/${id}`),
  createBulk: (data) => api.post('/results/bulk', data),
  getAnalytics: (params = {}) => api.get('/results/analytics', { params }),
}

// Generic error handler
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'An error occurred'
    toast.error(message)
    return message
  } else if (error.request) {
    // Request was made but no response received
    const message = 'Network error. Please check your connection.'
    toast.error(message)
    return message
  } else {
    // Something else happened
    const message = error.message || 'An unexpected error occurred'
    toast.error(message)
    return message
  }
}

export default api
