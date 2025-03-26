// routes/producer.js
const express = require('express')
const router = express.Router()
const producer = require('../middleware/producer')
const {
  register,
  login,
  getProfile,
  updateProfile,
  addProduct,
  updateProduct,
  getProducts,
  getProductDetails,
  createAnnouncement,
  getAnnouncements,
  getAnnouncementDetails,
  getOrders,
  updateOrderStatus,
} = require('../controller/producerController')

// Auth routes
router.post('/register', register)
router.post('/login', login)

// Profile routes
router.get('/profile', producer, getProfile)
router.put('/profile', producer, updateProfile)

// Product routes
router.post('/products', producer, addProduct)
router.put('/products/:productId', producer, updateProduct)
router.get('/products', producer, getProducts)
router.get('/products/:productId', producer, getProductDetails)

// Announcement routes
router.post('/announcements', producer, createAnnouncement)
router.get('/announcements', producer, getAnnouncements)
router.get('/announcements/:announcementId', producer, getAnnouncementDetails)

// Order routes
router.get('/orders', producer, getOrders)
router.put('/orders/:orderId/status', producer, updateOrderStatus)

module.exports = router
