const User = require('../models/user')
const Product = require('../models/product')
const Category = require('../models/category')
const Cart = require('../models/cart')
const Order = require('../models/order')
const Review = require('../models/review')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Customer register
exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullName,
      phoneNumber,
      address,
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
      address,
      role: 'customer',
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
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Customer login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username, role: 'customer' })
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
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get customer profile
exports.getProfile = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id).select(
      '-password -tokens',
    )
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.status(200).json(customer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update customer profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const allowedUpdates = [
      'fullName',
      'email',
      'phoneNumber',
      'address',
      'profilePicture',
    ]
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    )

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' })
    }

    const customer = await User.findById(req.user._id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    updates.forEach((update) => (customer[update] = req.body[update]))
    await customer.save()

    res.status(200).json(customer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all approved products
exports.getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query
    const filter = { isApproved: true, isActive: true }

    if (category) filter.category = category
    if (search) filter.name = { $regex: search, $options: 'i' }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const products = await Product.find(filter)
      .populate('category', 'name')
      .populate('producer', 'farmName')

    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get product details
exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
      .populate('category', 'name')
      .populate('producer', 'farmName farmLocation')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'username profilePicture',
        },
      })

    if (!product || !product.isApproved || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    const product = await Product.findById(productId)
    if (!product || !product.isApproved || !product.isActive) {
      return res.status(404).json({ message: 'Product not available' })
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' })
    }

    let cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    )

    if (itemIndex > -1) {
      // Update quantity if product already in cart
      cart.items[itemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity,
        priceAtAddition: product.price,
      })
    }

    await cart.save()
    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price images',
    )

    if (!cart) {
      return res.status(200).json({ items: [] })
    }

    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    )
    await cart.save()

    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params
    const { quantity } = req.body

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Quantity must be greater than 0' })
    }

    const product = await Product.findById(productId)
    if (!product || !product.isApproved || !product.isActive) {
      return res.status(404).json({ message: 'Product not available' })
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' })
    }

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    )
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' })
    }

    cart.items[itemIndex].quantity = quantity
    await cart.save()

    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { paymentMethod, shippingAddress } = req.body

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
    )
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    // Check stock availability
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id)
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        })
      }
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.priceAtAddition * item.quantity
    }, 0)

    // Create order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.priceAtAddition,
    }))

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      paymentMethod,
      shippingAddress: shippingAddress || req.user.address,
    })

    // Update product stock quantities
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stockQuantity: -item.quantity },
      })
    }

    // Clear cart
    cart.items = []
    await cart.save()
    await order.save()

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get customer orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })

    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
    }).populate('items.product', 'name images price')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Add review
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body

    // Check if product exists and was ordered by the user
    const hasOrdered = await Order.exists({
      user: req.user._id,
      'items.product': productId,
      orderStatus: 'delivered',
    })

    if (!hasOrdered) {
      return res
        .status(400)
        .json({ message: 'You can only review products you have purchased' })
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    })

    if (existingReview) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this product' })
    }

    const review = new Review({
      product: productId,
      user: req.user._id,
      rating,
      comment,
    })

    await review.save()

    // Update product rating stats
    await updateProductRating(productId)

    res.status(201).json(review)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Helper function to update product rating
async function updateProductRating(productId) {
  const result = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ])

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: result[0].averageRating,
      numReviews: result[0].count,
    })
  }
}
