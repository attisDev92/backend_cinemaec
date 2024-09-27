import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { SECRETADMIN } from '../config/config.js'

export const createAdmin = async (req, res) => {
  const { username, password } = req.body

  if (password.length < 5) {
    return res.status(400).json({ error: 'datos invalidos' })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const admin = new Admin({
      username,
      password: passwordHash,
    })
    const savedAdmin = await admin.save()
    res.status(201).json(savedAdmin)
  } catch (error) {
    res.status(500).json({ error: 'error al crear el usuario los datos' })
  }
}

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body

  try {
    const admin = await Admin.findOne({ username })

    const passwordCorrect = !admin
      ? null
      : await bcrypt.compare(password, admin.password)

    if (!(admin && passwordCorrect)) {
      return res.status(401).json({ error: 'usuario o contraseña incorrectos' })
    }

    const adminForToken = {
      username: admin.username,
      id: admin._id,
    }

    const adminToken = jwt.sign(adminForToken, SECRETADMIN, {
      expiresIn: 24 * 60 * 60,
    })

    res.status(200).send({ adminToken, username: admin.username })
  } catch (error) {
    res.status(500).json({ error: 'error al procesar los datos' })
  }
}

export const verifyLogin = async (req, res) => {
  try {
    res.status(202).json(req.userToken)
  } catch (error) {
    res.status(401).json({ error: 'Token invalido' })
  }
}
