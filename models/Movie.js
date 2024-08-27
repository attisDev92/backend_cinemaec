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
  screenPlayers: {
    type: [String],
    default: [],
  },
  storyLine: {
    type: String,
    minLength: 10,
    required: true,
  },
  sinopsis: {
    type: String,
    minLength: 10,
    require: true,
  },
  poster: {
    type: String,
    minLength: 10,
    default: '',
  },
  stills: {
    type: [String],
    default: [],
  },
  trailer: {
    type: String,
    minLength: 10,
    default: '',
  },
  feactureFilm: {
    type: String,
    minLength: 5,
    required: true,
  },
  time: {
    type: Number,
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
    dafault: [],
  },
  target: {
    type: String,
    minLength: 3,
    required: true,
  },
  animation: {
    type: Boolean,
    required: true,
    default: false,
  },
  festivals: {
    type: [String],
    default: [],
  },
  awards: {
    type: [String],
    default: [],
  },
  reaInformation: {
    type: new Schema({
      available: {
        type: Boolean,
        default: false,
      },
      expiration: {
        type: Date,
      },
      territoryLicense: {
        type: [String],
      },
    }),
  },
  channels: [
    {
      type: new Schema({
        platform: {
          type: String,
        },
        url: {
          type: String,
        },
      }),
    },
  ],
  contact: {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    mail: {
      type: String,
    },
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
