import axios from 'axios'

/**
 * Create Axios instance with base URL
 */
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

/**
 * REQUEST INTERCEPTOR
 * Automatically attaches Bearer token
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

/**
 * RESPONSE INTERCEPTOR
 * Handles 401 unauthorized
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized! Token may be expired.')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

/**
 * API CRUD WRAPPER
 * Provides cleaner syntax and auto-extracts data
 */
const api = {
  // Get request
  get(endpoint) {
    return axiosInstance.get(endpoint).then((res) => res.data)
  },

  // Post request
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body).then((res) => res.data)
  },

  // Put request
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body).then((res) => res.data)
  },

  // Patch request
  patch(endpoint, body) {
    return axiosInstance.patch(endpoint, body).then((res) => res.data)
  },

  // Delete request
  delete(endpoint) {
    return axiosInstance.delete(endpoint).then((res) => res.data)
  },
}

export default api
