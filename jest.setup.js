import mongoose from 'mongoose'
import { MONGODB } from './src/config/config'

beforeAll(async () => {
  await mongoose.connect(MONGODB)
})

afterAll(async () => {
  await mongoose.connection.close()
})
