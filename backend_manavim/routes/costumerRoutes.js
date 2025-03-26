// routes/customer.js
const express = require('express')
const router = express.Router()
const customer = require('../middleware/customer')
const {
  register,
  login,
  getProfile,
  updateProfile,
  getProducts,
  getProductDetails,
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  createOrder,
  getOrders,
  getOrderDetails,
  addReview,
} = require('../controller/costumerController')

// Auth routes
router.post('/register', register)
router.post('/login', login)

// Profile routes
router.get('/profile', customer, getProfile)
router.put('/profile', customer, updateProfile)

// Product routes
router.get('/products', customer, getProducts)
router.get('/products/:productId', customer, getProductDetails)

// Cart routes
router.post('/cart', customer, addToCart)
router.get('/cart', customer, getCart)
router.delete('/cart/:productId', customer, removeFromCart)
router.put('/cart/:productId', customer, updateCartItem)

// Order routes
router.post('/orders', customer, createOrder)
router.get('/orders', customer, getOrders)
router.get('/orders/:orderId', customer, getOrderDetails)

// Review routes
router.post('/reviews', customer, addReview)

module.exports = router
