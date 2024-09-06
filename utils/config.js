const { error } = require('./logger')
require('dotenv').config()

const PORT = process.env.PORT

let MONGODB
let firebaseStorage

if (process.env.NODE_ENV === 'production') {
  MONGODB = process.env.MONGODB_URI
  firebaseStorage = 'cinemaec'
} else if (process.env.NODE_ENV === 'development') {
  MONGODB = process.env.DEV_MONGODB_URI
  firebaseStorage = 'cinemaec-test'
} else if (process.env.NODE_ENV === 'test') {
  MONGODB = process.env.TEST_MONGODB_URI
  firebaseStorage = 'cinemaec-test'
} else {
  error('NODE_ENV is invalid')
}

const SECRETADMIN = process.env.SECRET_ADMIN

module.exports = {
  PORT,
  MONGODB,
  SECRETADMIN,
  firebaseStorage,
}
