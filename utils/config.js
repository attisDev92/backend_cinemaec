const { error } = require('./logger')
require('dotenv').config()

const PORT = process.env.PORT

let MONGODB
let firebaseStorage
let allowedOrigins

if (process.env.NODE_ENV === 'production') {
  MONGODB = process.env.MONGODB_URI
  firebaseStorage = 'cinemaec'
  allowedOrigins = ['https://admin.cinemaec.com', 'https://cinemaec.com']
} else if (process.env.NODE_ENV === 'development') {
  MONGODB = process.env.DEV_MONGODB_URI
  firebaseStorage = 'cinemaec-test'
  allowedOrigins = ['http://localhost:5173']
} else if (process.env.NODE_ENV === 'test') {
  MONGODB = process.env.TEST_MONGODB_URI
  firebaseStorage = 'cinemaec-test'
  allowedOrigins = ['http://localhost:5173']
} else {
  error('NODE_ENV is invalid')
}

const SECRETADMIN = process.env.SECRET_ADMIN

module.exports = {
  PORT,
  MONGODB,
  SECRETADMIN,
  firebaseStorage,
  allowedOrigins,
}
