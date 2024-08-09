require('dotenv').config()

const PORT= process.env.PORT

let MONGODB = process.env.MONGODB_URI
if(process.env.NODE_ENV === 'test') {
  MONGODB = process.env.TEST_MONGODB_URI
}

module.exports = {
  PORT,
  MONGODB,
}