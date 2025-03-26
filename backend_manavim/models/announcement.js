const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isApproved: { type: Boolean, default: false },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: Date,
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
})

const Announcement = mongoose.model('Announcement', announcementSchema)
module.exports = Announcement
