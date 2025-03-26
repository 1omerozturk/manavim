// middleware/auth.js
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(401).json({ error: 'Access denied, token required' })
    }

    const sanitizedToken = token.replace('Bearer ', '')
    const decoded = jwt.verify(sanitizedToken, process.env.JWT_SECRET)

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': sanitizedToken,
    })

    if (!user) {
      return res.status(401).json({ error: 'Please authenticate' })
    }

    req.token = sanitizedToken
    req.user = user
    next()
  } catch (error) {
    console.error('Authentication failed:', error)
    res.status(401).json({ error: 'Please authenticate' })
  }
}

module.exports = auth
