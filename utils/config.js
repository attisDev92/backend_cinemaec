/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT

const MONGODB =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const SECRETADMIN = process.env.SECRET_ADMIN

module.exports = {
  PORT,
  MONGODB,
  SECRETADMIN,
}
