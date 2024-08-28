const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const { SECRETADMIN } = require('../utils/config')

const createAdmin = async (req, res) => {
  const { username, password } = req.body

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

const loginAdmin = async (req, res) => {
  const { username, password } = req.body

  try {
    const admin = await Admin.findOne({ username })

    const passwordCorrect = !admin
      ? null
      : await bcrypt.compare(password, admin.password)

    if (!(admin && passwordCorrect)) {
      return res.status(401).json({ error: 'datos invalidos' })
    }

    const adminForToken = {
      username: admin.username,
      id: admin._id,
    }

    const adminToken = jwt.sign(adminForToken, SECRETADMIN, {
      expiresIn: 3 * 24 * 60 * 60,
    })

    res.status(200).send({ adminToken, username: admin.username })
  } catch (error) {
    res.status(500).json({ error: 'error al procesar los datos' })
  }
}

module.exports = {
  createAdmin,
  loginAdmin,
}
