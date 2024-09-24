// import Admin from '../../models/Admin'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import { SECRETADMIN } from '../utils/config'

// const adminObject = {
//   username: 'AdminRea',
//   password: 'REA_pass.',
// }

// const newAdmin = {
//   username: 'Admin',
//   password: 'Admin',
// }

// const postAdmin = async () => {
//   const passwordHash = await bcrypt.hash(adminObject.password, 10)
//   const initialAdmin = new Admin({
//     ...adminObject,
//     password: passwordHash,
//   })
//   return initialAdmin.save()
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
