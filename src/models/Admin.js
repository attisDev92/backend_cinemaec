import { Schema, model } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
})

adminSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

adminSchema.plugin(mongooseUniqueValidator)

export default model('Admin', adminSchema)
