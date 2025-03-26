const express = require('express')
const router = express.Router()

const adminRoutes = require('./adminRoutes')
const customerRoutes = require('./costumerRoutes')
const producerRoutes = require('./producerRoutes')

router.use('/admin', adminRoutes)
router.use('/customer', customerRoutes)
router.use('/producer', producerRoutes)

module.exports = router
