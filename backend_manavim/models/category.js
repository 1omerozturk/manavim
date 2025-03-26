const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
