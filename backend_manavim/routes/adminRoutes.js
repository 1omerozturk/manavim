// routes/admin.js
const express = require('express')
const router = express.Router()
const admin = require('../middleware/admin')
const {
  register,
  login,
  getAllUsers,
  updateProducerStatus,
  updateProductStatus,
  updateAnnouncementStatus,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controller/adminController')

router.post('/register', register)
router.post('/login', login)

// Kullanıcı işlemleri
router.get('/users', admin, getAllUsers)
router.put('/producers/:producerId/approve', admin, updateProducerStatus)

// Ürün işlemleri
router.put('/products/:productId/approve', admin, updateProductStatus)

// İlan işlemleri
router.put(
  '/announcements/:announcementId/approve',
  admin,
  updateAnnouncementStatus,
)

// Kategori işlemleri
router.post('/categories', admin, createCategory)
router.put('/categories/:categoryId', admin, updateCategory)
router.delete('/categories/:categoryId', admin, deleteCategory)

module.exports = router
