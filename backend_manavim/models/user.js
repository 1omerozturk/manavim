const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'customer', 'producer'],
    default: 'customer',
  },
  createdAt: { type: Date, default: Date.now },
  profilePicture: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phoneNumber: String,
  isVerified: { type: Boolean, default: false },
  tokens: [{ token: { type: String, required: true } }],
  // Producer specific fields
  farmName: {
    type: String,
    required: function () {
      return this.role === 'producer'
    },
  },
  farmLocation: {
    type: String,
    required: function () {
      return this.role === 'producer'
    },
  },
  farmDescription: String,
  producerApproved: { type: Boolean, default: false },
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '7d' },
  )
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
