const { error } = require('./logger')
require('dotenv').config()

const PORT = process.env.PORT

let MONGODB

if (process.env.NODE_ENV === 'production') {
  MONGODB = process.env.MONGODB_URI
} else if (process.env.NODE_ENV === 'development') {
  MONGODB = process.env.DEV_MONGODB_URI
} else if (process.env.NODE_ENV === 'test') {
  MONGODB = process.env.TEST_MONGODB_URI
} else {
  error('NODE_ENV is invalid')
}

const SECRETADMIN = process.env.SECRET_ADMIN

module.exports = {
  PORT,
  MONGODB,
  SECRETADMIN,
}
