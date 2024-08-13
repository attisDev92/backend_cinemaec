const { Schema, model } = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

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
    unique: true,
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

module.exports = model('Admin', adminSchema)
