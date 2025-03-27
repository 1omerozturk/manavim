const User = require('../models/user')
const Product = require('../models/product')
const Category = require('../models/category')
const Announcement = require('../models/announcement')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//admin register
exports.register = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password, fullName, role, farmName, farmLocation } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    
    // Validate producer required fields
    if (role === 'producer' && (!farmName || !farmLocation)) {
      return res.status(400).json({ 
        message: 'Farm name and location are required for producer accounts' 
      })
    }

    const user = new User({
      username,
      email,
      password,
      fullName,
      role,
      ...(role === 'producer' && { farmName, farmLocation })
    })
    
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email, role: 'admin' })
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
      user: { id: user._id, username: user.username, role: user.role },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id).select('-password -tokens')
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }
    res.status(200).json(admin)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -tokens')
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Approve/Disapprove producer
exports.updateProducerStatus = async (req, res) => {
  try {
    const { producerId } = req.params
    const { isApproved } = req.body

    const producer = await User.findByIdAndUpdate(
      producerId,
      { producerApproved: isApproved },
      { new: true },
    ).select('-password -tokens')

    if (!producer) {
      return res.status(404).json({ message: 'Producer not found' })
    }

    res.status(200).json({ message: 'Producer status updated', producer })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Approve/Disapprove product
exports.updateProductStatus = async (req, res) => {
  try {
    const { productId } = req.params
    const { isApproved } = req.body

    const product = await Product.findByIdAndUpdate(
      productId,
      { isApproved },
      { new: true },
    )

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({ message: 'Product status updated', product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Approve/Disapprove announcement
exports.updateAnnouncementStatus = async (req, res) => {
  try {
    const { announcementId } = req.params
    const { isApproved } = req.body

    const announcement = await Announcement.findByIdAndUpdate(
      announcementId,
      {
        isApproved,
        approvedBy: req.user._id,
        approvedAt: isApproved ? Date.now() : null,
      },
      { new: true },
    )

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' })
    }

    res
      .status(200)
      .json({ message: 'Announcement status updated', announcement })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body
    const category = new Category({ name, description, image })
    await category.save()
    res.status(201).json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const updates = req.body

    const category = await Category.findByIdAndUpdate(categoryId, updates, {
      new: true,
    })
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const category = await Category.findByIdAndDelete(categoryId)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all products (with filters)
exports.getAllProducts = async (req, res) => {
  try {
    const { category, producer, isApproved } = req.query
    const filter = {}

    if (category) filter.category = category
    if (producer) filter.producer = producer
    if (isApproved) filter.isApproved = isApproved === 'true'

    const products = await Product.find(filter)
      .populate('category', 'name')
      .populate('producer', 'username farmName')

    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all announcements (with filters)
exports.getAllAnnouncements = async (req, res) => {
  try {
    const { producer, isApproved } = req.query
    const filter = {}

    if (producer) filter.producer = producer
    if (isApproved) filter.isApproved = isApproved === 'true'

    const announcements = await Announcement.find(filter)
      .populate('producer', 'username farmName')
      .populate('approvedBy', 'username')

    res.status(200).json(announcements)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
