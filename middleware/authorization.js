module.exports = function (req, res, next) {
  try {
    req.user = { userId: 21 }
    next()
  } catch (err) {
    res.status(400).json({ message: 'Middleware error' })
  }
}
