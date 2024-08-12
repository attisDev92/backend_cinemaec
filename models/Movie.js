const { Schema, model } = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  director: {
    type: String,
    minLength: 5,
    required: true,
  },
  poster: {
    type: String,
    minLength: 10,
    unique: true,
  },
  time: {
    type: Number,
    required: true,
  },
  stills: {
    type: [String],
  },
  storyLine: {
    type: String,
    minLength: 10,
    required: true,
  },
  trailer: {
    type: String,
    minLength: 10,
    unique: true,
  },
  feactureFilm: {
    type: String,
    minLength: 5,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    minLength: 5,
    required: true,
  },
  language: {
    type: [String],
    required: true,
  },
  subtitles: {
    type: [String],
  },
  target: {
    type: String,
    minLength: 3,
    required: true,
  },
  animation: {
    type: Boolean,
    required: true,
  },
  expiration: {
    type: Date,
  },
  festivals: {
    type: [String],
  },
  awards: {
    type: [String],
  },
  availableForREA: {
    type: Boolean,
    required: true,
  },
  territoryLicense: {
    type: [String],
  },
  created: {
    type: Date,
    default: new Date(),
  },
})

movieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

movieSchema.plugin(mongooseUniqueValidator)

module.exports = model('Movie', movieSchema)
