import axios from 'axios'
import { getSession } from 'next-auth/react'

const API_URL = 'http://localhost:6060/api'

// Check if we're in a browser environment
const isBrowser = () => typeof window !== 'undefined'

// Auth token helper
const getAuthHeader = () => {
  if (!isBrowser()) return {}
  
  // Try to get token from localStorage
  const token = localStorage.getItem('user_token') // Use consistent token key
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Create axios instance with request interceptor for auth
const axiosInstance = axios.create({
  baseURL: API_URL
})

// Add request interceptor to handle authorization
if (isBrowser()) {
  axiosInstance.interceptors.request.use(
    async (config) => {
      console.log("API: Interceptor running to set auth headers");
      
      // Try to get token from localStorage first
      let token = localStorage.getItem('user_token');
      console.log("API: Token from localStorage:", token ? "Found" : "Not found");
      
      // If no token in localStorage, try to get from next-auth session
      if (!token) {
        try {
          console.log("API: Trying to get token from next-auth session");
          const session = await getSession();
          
          if (session?.user?.token) {
            token = session.user.token;
            console.log("API: Token found in next-auth session");
            
            // Store the token in localStorage for future requests
            localStorage.setItem('user_token', token);
            
            if (session.user) {
              localStorage.setItem('user_data', JSON.stringify(session.user));
            }
          } else {
            console.log("API: No token in next-auth session");
          }
        } catch (sessionError) {
          console.error("API: Error getting session:", sessionError);
        }
      }
      
      if (token) {
        console.log("API: Setting Authorization header with token");
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("API: No token available for request");
      }
      
      return config;
    },
    (error) => {
      console.error("API: Interceptor error:", error);
      return Promise.reject(error);
    }
  );
}

//admin register
export const admin = {
  register: async (userData) => {
    return axios.post(`${API_URL}/admin/register`, userData)
  },
  login: async (credentials) => {
    return axios.post(`${API_URL}/admin/login`, credentials)
  },
}

// Auth API
export const authAPI = {
  login: async (email, password, role) => {
    return axios.post(`${API_URL}/${role}/login`, { email, password })
  },
  register: async (userData, role) => {
    console.log('Registering with:', userData, 'Role:', role)
    return axios.post(`${API_URL}/${role}/register`, userData)
  },
}

// Customer API - use the axiosInstance with token handling
export const customerAPI = {
  // Profile
  getProfile: async () => {
    return axiosInstance.get(`/customer/profile`)
  },
  updateProfile: async (data) => {
    return axiosInstance.put(`/customer/profile`, data)
  },

  // Orders
  createOrder: async (orderData) => {
    return axiosInstance.post(`/customer/orders`, orderData)
  },
  getOrders: async () => {
    return axiosInstance.get(`/customer/orders`)
  },

  // Cart
  getCart: async () => {
    return axiosInstance.get(`/customer/cart`)
  },
  addToCart: async (productData) => {
    return axiosInstance.post(`/customer/cart`, productData)
  },
  updateCart: async (cartItemId, quantity) => {
    return axiosInstance.put(`/customer/cart/${cartItemId}`, { quantity })
  },

  // Reviews
  addReview: async (productId, reviewData) => {
    return axiosInstance.post(`/customer/reviews/${productId}`, reviewData)
  },
}

// Producer API - use the axiosInstance with token handling
export const producerAPI = {
  // Products
  getProducts: async () => {
    return axiosInstance.get(`/producer/products`)
  },
  addProduct: async (productData) => {
    return axiosInstance.post(`/producer/products`, productData)
  },
  updateProduct: async (productId, productData) => {
    return axiosInstance.put(`/producer/products/${productId}`, productData)
  },
  deleteProduct: async (productId) => {
    return axiosInstance.delete(`/producer/products/${productId}`)
  },

  // Orders
  getProducerOrders: async () => {
    return axiosInstance.get(`/producer/orders`)
  },
  updateOrderStatus: async (orderId, status) => {
    return axiosInstance.put(`/producer/orders/${orderId}`, { status })
  },
}

// Admin API - use the axiosInstance with token handling
export const adminAPI = {
  // Users
  getAllUsers: async () => {
    return axiosInstance.get(`/admin/users`)
  },
  updateUserStatus: async (userId, status) => {
    return axiosInstance.put(`/admin/users/${userId}`, { status })
  },

  // Categories
  getCategories: async () => {
    return axiosInstance.get(`/admin/categories`)
  },
  addCategory: async (categoryData) => {
    return axiosInstance.post(`/admin/categories`, categoryData)
  },

  // Announcements
  getAnnouncements: async () => {
    return axiosInstance.get(`/admin/announcements`)
  },
  createAnnouncement: async (announcementData) => {
    return axiosInstance.post(`/admin/announcements`, announcementData)
  },
}

// Public API (no auth required)
export const publicAPI = {
  getProducts: async () => {
    return axios.get(`${API_URL}/products`)
  },
  getCategories: async () => {
    return axios.get(`${API_URL}/categories`)
  },
  getAnnouncements: async () => {
    return axios.get(`${API_URL}/announcements`)
  },
}
