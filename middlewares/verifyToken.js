const jwt = require('jsonwebtoken')
const { SECRETADMIN } = require('../utils/config')

const verifyAdminToken = async (req, res, next) => {
  const authorization = req.get('authorization')
  try {
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.replace(/bearer\s+/i, '')
    }

    if (!token) {
      return res.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, SECRETADMIN)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token' })
    }

    req.userToken = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: 'invalid token' })
  }
}

module.exports = {
  verifyAdminToken,
}
