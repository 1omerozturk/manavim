const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
})

reviewSchema.index({ product: 1, user: 1 }, { unique: true })

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
