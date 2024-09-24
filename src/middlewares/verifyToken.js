import jwt from 'jsonwebtoken'
import { SECRETADMIN } from '../config/config.js'

const verifyAdminToken = async (req, res, next) => {
  const authorization = req.get('authorization')
  try {
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.replace(/bearer\s+/i, '')
    }

    if (!token) {
      return res.status(401).json({ error: 'No tiene credenciales' })
    }

    const decodedToken = jwt.verify(token, SECRETADMIN)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Credenciales invalidas' })
    }

    req.userToken = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Credenciales invalidas' })
  }
}

export default verifyAdminToken
