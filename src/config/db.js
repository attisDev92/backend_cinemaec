import mongoose from 'mongoose'
import { info } from '../utils/logger.js'
import { MONGODB } from './config.js'

mongoose.set('strictQuery', false)
info(`connecting to MongoDB`)

mongoose
  .connect(MONGODB)
  .then(() => {
    info('connect to MongoDB')
  })
  .catch(error => {
    console.log('error connecting database', error)
  })
