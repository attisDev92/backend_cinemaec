const { Schema, model } = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const movieSchema = new Schema({
  title: {
    type: String,
    minLength: 1,
    unique: true,
    required: [true, 'El título es obligatorio'],
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
    type: {
      url: {
        type: String,
      },
    },
    default: {},
  },
  stills: {
    type: [
      {
        url: {
          type: String,
        },
      },
    ],
    default: [],
  },
  trailer: {
    type: String,
    unique: '',
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
  genre: {
    type: String,
    enum: ['Ficción', 'Documental'],
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
    required: [true, 'Es obligatorio registrar almenos un subgenero'],
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
        emun: ['Nacional', 'Internacional', 'Retina Latina'],
      },
    },
    default: {
      available: false,
    },
  },
  channels: {
    type: [
      {
        plataform: {
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
      },
      role: {
        type: String,
      },
      phone: {
        type: String,
      },
      mail: {
        type: String,
      },
    },
    default: {},
  },
  created: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
})

movieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// movieSchema.plugin(mongooseUniqueValidator)

module.exports = model('Movie', movieSchema)
