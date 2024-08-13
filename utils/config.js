/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT

const MONGODB =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const SECRET_ADMIN = process.env.SECRET_ADMIN

module.exports = {
  PORT,
  MONGODB,
  SECRET_ADMIN,
}
