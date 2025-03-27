import axios from 'axios';

const API_URL = 'http://localhost:6060/api';

// Auth token helper
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

//admin register
export const admin = {
  register: async (userData) => {
    return axios.post(`${API_URL}/admin/register`, userData)
  },
  login:async(credentials)=>{
    return axios.post(`${API_URL}/admin/login`,credentials)
  }
}


// Auth API
export const authAPI = {
  login: async (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
  },
  register: async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
  }
};

// Customer API
export const customerAPI = {
  // Profile
  getProfile: async () => {
    return axios.get(`${API_URL}/customer/profile`, { headers: getAuthHeader() });
  },
  updateProfile: async (data) => {
    return axios.put(`${API_URL}/customer/profile`, data, { headers: getAuthHeader() });
  },
  
  // Orders
  createOrder: async (orderData) => {
    return axios.post(`${API_URL}/customer/orders`, orderData, { headers: getAuthHeader() });
  },
  getOrders: async () => {
    return axios.get(`${API_URL}/customer/orders`, { headers: getAuthHeader() });
  },
  
  // Cart
  getCart: async () => {
    return axios.get(`${API_URL}/customer/cart`, { headers: getAuthHeader() });
  },
  addToCart: async (productData) => {
    return axios.post(`${API_URL}/customer/cart`, productData, { headers: getAuthHeader() });
  },
  updateCart: async (cartItemId, quantity) => {
    return axios.put(`${API_URL}/customer/cart/${cartItemId}`, { quantity }, { headers: getAuthHeader() });
  },
  
  // Reviews
  addReview: async (productId, reviewData) => {
    return axios.post(`${API_URL}/customer/reviews/${productId}`, reviewData, { headers: getAuthHeader() });
  }
};

// Producer API
export const producerAPI = {
  // Products
  getProducts: async () => {
    return axios.get(`${API_URL}/producer/products`, { headers: getAuthHeader() });
  },
  addProduct: async (productData) => {
    return axios.post(`${API_URL}/producer/products`, productData, { headers: getAuthHeader() });
  },
  updateProduct: async (productId, productData) => {
    return axios.put(`${API_URL}/producer/products/${productId}`, productData, { headers: getAuthHeader() });
  },
  deleteProduct: async (productId) => {
    return axios.delete(`${API_URL}/producer/products/${productId}`, { headers: getAuthHeader() });
  },
  
  // Orders
  getProducerOrders: async () => {
    return axios.get(`${API_URL}/producer/orders`, { headers: getAuthHeader() });
  },
  updateOrderStatus: async (orderId, status) => {
    return axios.put(`${API_URL}/producer/orders/${orderId}`, { status }, { headers: getAuthHeader() });
  }
};

// Admin API
export const adminAPI = {
  // Users
  getAllUsers: async () => {
    return axios.get(`${API_URL}/admin/users`, { headers: getAuthHeader() });
  },
  updateUserStatus: async (userId, status) => {
    return axios.put(`${API_URL}/admin/users/${userId}`, { status }, { headers: getAuthHeader() });
  },
  
  // Categories
  getCategories: async () => {
    return axios.get(`${API_URL}/admin/categories`, { headers: getAuthHeader() });
  },
  addCategory: async (categoryData) => {
    return axios.post(`${API_URL}/admin/categories`, categoryData, { headers: getAuthHeader() });
  },
  
  // Announcements
  getAnnouncements: async () => {
    return axios.get(`${API_URL}/admin/announcements`, { headers: getAuthHeader() });
  },
  createAnnouncement: async (announcementData) => {
    return axios.post(`${API_URL}/admin/announcements`, announcementData, { headers: getAuthHeader() });
  }
};

// Public API (no auth required)
export const publicAPI = {
  getProducts: async () => {
    return axios.get(`${API_URL}/products`);
  },
  getCategories: async () => {
    return axios.get(`${API_URL}/categories`);
  },
  getAnnouncements: async () => {
    return axios.get(`${API_URL}/announcements`);
  }
};
