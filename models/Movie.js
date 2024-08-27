const { Schema, model } = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    minLength: 1,
    unique: true,
  },
  director: {
    type: String,
    minLength: 5,
    required: [true, 'El nombre del director es obligatorio'],
  },
  productionCompany: {
    type: String,
    default: '',
  },
  storyLine: {
    type: String,
    minLength: 40,
    required: [true, 'Se require un storyline'],
  },
  plot: {
    type: String,
    minLength: 100,
    require: [true, 'Se requiere sinopsis'],
  },
  poster: {
    type: String,
    match: /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?$/i,
    default: '',
  },
  stills: {
    type: [String],
    validate: {
      validator: value => {
        const urlRegex = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?$/i
        return value.every(still => urlRegex.test(still))
      },
      message: 'Todos los elementos del array "stills" deben ser URLs válidas',
    },
    default: [],
  },
  trailer: {
    type: String,
    match: /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?$/i,
    default: '',
  },
  technicalTeam: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
          enum: [
            'Guionista',
            'Productor/a',
            'Director/a de fotografía',
            'Director/a de arte',
            'Sonido',
            'Montaje',
            'Postproducción',
            'Musicalización',
          ],
        },
      },
    ],
    validate: {
      validator: value => {
        return value.every(
          member =>
            Object.keys(member).length === 2 &&
            'name' in member &&
            'role' in member,
        )
      },
      message: 'Cada miembro del equipo técnico debe tener un nombre y un rol.',
    },
    default: [],
  },
  cast: {
    type: [String],
    default: [],
  },
  runTime: {
    type: Number,
    min: 1,
    required: [true, 'Coloque la duración de la obra en minutos'],
  },
  genre: {
    type: String,
    enum: ['Ficción', 'Docuemntal'],
    required: [true, 'Es obligatorio seleccionar un genero'],
  },
  sub_genre: {
    type: [String],
    enum: [
      'Acción',
      'Animación',
      'Aventuras',
      'Bélico',
      'Biográfico',
      'Ciencia Ficción',
      'Científico',
      'Comedia',
      'Deportivo',
      'Drama',
      'Educativo',
      'Etnográfico',
      'Experimental',
      'Fantástico',
      'Histórico',
      'Investigación Periodística',
      'Medioambiente',
      'Musical',
      'Policial',
      'Político Social',
      'Romántico',
      'Suspenso',
      'Terror',
      'Viajes',
      'Familiar',
    ],
    required: true,
  },
  realeseYear: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear(),
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
    default: [],
  },
  target: {
    type: String,
    minLength: 3,
    enum: [
      'Todo público',
      'Infantil',
      '-12 bajo supervisión',
      '+12 años',
      '+15 años',
      '+18 años',
    ],
    required: true,
  },
  festivals: {
    type: [String],
    default: [],
  },
  awards: {
    type: [String],
    default: [],
  },
  funding: {
    type: [String],
    default: [],
  },
  reaInformation: {
    type: {
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
    },
    default: {
      available: false,
    },
  },
  channels: {
    type: [
      {
        platform: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  contact: {
    type: {
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      mail: {
        type: String,
        required: true,
      },
    },
    default: {},
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
