import Admin from '../../src/models/Admin'
import bcrypt from 'bcrypt'
//import jwt from 'jsonwebtoken'
//import { SECRETADMIN } from '../utils/config'

export const newAdmin = {
  username: 'Admin',
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

// const adminObject = {
//   username: 'AdminRea',
//   password: 'REA_pass.',
// }

// const getAllAdmins = async () => {
//   return await Admin.find({})
// }

// const createAdmin = async () => {
//   passwordHash = await bcrypt.hash(newAdmin.password, 10)
//   const admin = new Admin({
//     username: newAdmin.username,
//     password: passwordHash,
//   })
//   return await admin.save()
// }

// const getAdminToken = async () => {
//   const admin = await createAdmin()
//   const token = jwt.sign(
//     {
//       username: admin.username,
//       id: admin._id,
//     },
//     SECRETADMIN,
//     { expiresIn: '1h' },
//   )

//   return token
// }

// export default {
//   adminObject,
//   postAdmin,
//   getAllAdmins,
//   newAdmin,
//   createAdmin,
//   getAdminToken,
// }
