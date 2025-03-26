const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: [String],
  stockQuantity: { type: Number, required: true, min: 0, default: 0 },
  unit: {
    type: String,
    enum: ['kg', 'piece', 'liter', 'packet'],
    default: 'kg',
  },
  isOrganic: { type: Boolean, default: false },
  harvestDate: Date,
  expiryDate: Date,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
