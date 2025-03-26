const auth = require('./auth')

const producer = async (req, res, next) => {
  await auth(req, res, () => {
    if (req.user.role !== 'producer') {
      return res.status(403).json({ error: 'Access denied, producers only' })
    }

    if (!req.user.producerApproved) {
      return res
        .status(403)
        .json({ error: 'Your producer account is not approved yet' })
    }

    next()
  })
}

module.exports = producer
