const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')

const adminObject = {
  username: 'AdminRea',
  password: 'REA_pass.',
}

const newAdmin = {
  username: 'AdminTest',
  password: 'passTest',
}

const postAdmin = async () => {
  const passwordHash = await bcrypt.hash(adminObject.password, 10)
  const initialAdmin = new Admin({
    ...adminObject,
    password: passwordHash,
  })
  return initialAdmin.save()
}

const getAllAdmins = async () => {
  return await Admin.find({})
}

module.exports = {
  adminObject,
  postAdmin,
  getAllAdmins,
  newAdmin,
}
