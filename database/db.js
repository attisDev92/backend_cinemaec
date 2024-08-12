const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

mongoose.set('strictQuery', false)
logger.info(`connecting to MongoDB`)

mongoose
  .connect(config.MONGODB)
  .then(() => {
    logger.info('connect to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting database', error)
  })
