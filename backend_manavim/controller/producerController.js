const User = require('../models/user')
const Product = require('../models/product')
const Category = require('../models/category')
const Announcement = require('../models/announcement')
const Order = require('../models/order')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Producer register
exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullName,
      phoneNumber,
      farmName,
      farmLocation,
      farmDescription,
    } = req.body

    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username or email already exists' })
    }

    const user = new User({
      username,
      email,
      password,
      fullName,
      phoneNumber,
      role: 'producer',
      farmName,
      farmLocation,
      farmDescription,
    })

    await user.save()
    const token = await user.generateAuthToken()

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        producerApproved: user.producerApproved,
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Producer login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username, role: 'producer' })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = await user.generateAuthToken()
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        producerApproved: user.producerApproved,
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get producer profile
exports.getProfile = async (req, res) => {
  try {
    const producer = await User.findById(req.user._id).select(
      '-password -tokens',
    )
    if (!producer) {
      return res.status(404).json({ message: 'Producer not found' })
    }
    res.status(200).json(producer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update producer profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const allowedUpdates = [
      'fullName',
      'email',
      'phoneNumber',
      'profilePicture',
      'farmName',
      'farmLocation',
      'farmDescription',
    ]
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    )

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' })
    }

    const producer = await User.findById(req.user._id)
    if (!producer) {
      return res.status(404).json({ message: 'Producer not found' })
    }

    updates.forEach((update) => (producer[update] = req.body[update]))
    await producer.save()

    res.status(200).json(producer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Add product (requires admin approval)
exports.addProduct = async (req, res) => {
  try {
    if (!req.user.producerApproved) {
      return res
        .status(403)
        .json({ message: 'Your producer account is not approved yet' })
    }

    const {
      name,
      description,
      price,
      category,
      stockQuantity,
      unit,
      isOrganic,
      harvestDate,
      expiryDate,
    } = req.body

    const categoryExists = await Category.findById(category)
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' })
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      producer: req.user._id,
      stockQuantity,
      unit,
      isOrganic,
      harvestDate,
      expiryDate,
      images: req.files?.map((file) => file.path) || [],
    })

    await product.save()
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const updates = req.body

    // Only allow updates to certain fields
    const allowedUpdates = [
      'name',
      'description',
      'price',
      'category',
      'stockQuantity',
      'unit',
      'isOrganic',
      'harvestDate',
      'expiryDate',
    ]
    const isValidOperation = Object.keys(updates).every((update) =>
      allowedUpdates.includes(update),
    )

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' })
    }

    const product = await Product.findOne({
      _id: productId,
      producer: req.user._id,
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    Object.keys(updates).forEach(
      (update) => (product[update] = updates[update]),
    )
    await product.save()

    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get producer's products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ producer: req.user._id }).populate(
      'category',
      'name',
    )

    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get product details
exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.productId,
      producer: req.user._id,
    })
      .populate('category', 'name')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'username profilePicture',
        },
      })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create announcement (requires admin approval)
exports.createAnnouncement = async (req, res) => {
  try {
    if (!req.user.producerApproved) {
      return res
        .status(403)
        .json({ message: 'Your producer account is not approved yet' })
    }

    const { title, description, productId, startDate, endDate } = req.body

    const announcement = new Announcement({
      producer: req.user._id,
      product: productId,
      title,
      description,
      images: req.files?.map((file) => file.path) || [],
      startDate,
      endDate,
    })

    await announcement.save()
    res.status(201).json(announcement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get producer's announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ producer: req.user._id })
      .populate('product', 'name price')
      .populate('approvedBy', 'username')

    res.status(200).json(announcements)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get announcement details
exports.getAnnouncementDetails = async (req, res) => {
  try {
    const announcement = await Announcement.findOne({
      _id: req.params.announcementId,
      producer: req.user._id,
    })
      .populate('product', 'name price images')
      .populate('approvedBy', 'username')

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' })
    }

    res.status(200).json(announcement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get producer's orders
exports.getOrders = async (req, res) => {
  try {
    // Find orders that contain products from this producer
    const orders = await Order.find({
      'items.product': {
        $in: await Product.find({ producer: req.user._id }).distinct('_id'),
      },
    })
      .populate('user', 'username email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 })

    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update order status (for producer's products)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body

    // Verify that the order contains products from this producer
    const order = await Order.findOne({
      _id: orderId,
      'items.product': {
        $in: await Product.find({ producer: req.user._id }).distinct('_id'),
      },
    })

    if (!order) {
      return res
        .status(404)
        .json({ message: 'Order not found or not authorized' })
    }

    order.orderStatus = status
    if (status === 'delivered') {
      order.deliveredAt = new Date()
    }

    await order.save()
    res.status(200).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
