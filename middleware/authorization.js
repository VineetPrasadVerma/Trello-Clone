const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // Get token from header
  const accessToken = req.headers['x-auth-token']
  if (!accessToken) return res.status(401).json({ msg: 'No token, authorization denied' })

  try {
    // Verify token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    // Add user from payload
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' })
  }
}
