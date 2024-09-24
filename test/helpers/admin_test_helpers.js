import Admin from '../../src/models/Admin'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRETADMIN } from '../../src/config/config'

export const newAdmin = {
  username: `Admin_${Math.random()}`,
  password: 'Admin',
}

export const invalidAdmin = {
  username: 'wrong Admin',
  password: '',
}

export const postAdmin = async admin => {
  const passwordHash = await bcrypt.hash(admin.password, 10)
  const initialAdmin = new Admin({
    ...admin,
    password: passwordHash,
  })
  return initialAdmin.save()
}

export const getAllAdmins = async () => {
  const admins = await Admin.find({})
  return admins
}

export const getAdminToken = async () => {
  const admin = await Admin.findOne({ username: newAdmin.username })

  const token = jwt.sign(
    {
      username: admin.username,
      id: admin._id,
    },
    SECRETADMIN,
    { expiresIn: '1h' },
  )

  return token
}
