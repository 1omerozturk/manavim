const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  type: {
    type: String,
    enum: ['order', 'announcement', 'system', 'promotion'],
    required: true,
  },
  relatedId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
})

const Notification = mongoose.model('Notification', notificationSchema)
module.exports = Notification
