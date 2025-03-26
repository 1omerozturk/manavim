const auth = require('./auth')

const customer = async (req, res, next) => {
  await auth(req, res, () => {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Access denied, customers only' })
    }
    next()
  })
}

module.exports = customer
