import mongoose from 'mongoose'
import { MONGODB } from './config/config'

beforeAll(async () => {
  await mongoose.connect(MONGODB)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})
