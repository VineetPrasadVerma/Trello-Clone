const jwt = require('jsonwebtoken')

const getAuthCookie = (req) => {
  let accessToken = null
  const cookieHeaderString = req.headers.cookie

  if (cookieHeaderString) {
    const cookies = cookieHeaderString.split(';')

    for (const cookie of cookies) {
      const [key, value] = cookie.split('=')
      if (key === 'x-auth-token') {
        accessToken = value
        break
      }
    }
  }

  return accessToken
}

module.exports = function (req, res, next) {
  // Get token from header
  const accessToken = getAuthCookie(req)
  if (!accessToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

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
