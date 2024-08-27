const Movie = require('../models/Movie')
const { upload, uploadFiles } = require('../middlewares/uploadFiles')

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({})
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: 'Error to fetch all movies' })
  }
}

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (movie) {
      res.json(movie)
    } else {
      res.status(404).json({ error: 'Película no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error to fetch the movie' })
  }
}

const createMovie = [
  upload,
  uploadFiles,
  async (req, res) => {
    try {
      const parsedBody = { ...req.body }

      if (parsedBody.screenplayers) {
        parsedBody.screenplayers = JSON.parse(parsedBody.screenplayers)
      }
      if (parsedBody.time) {
        parsedBody.time = parseInt(parsedBody.time)
      }
      if (parsedBody.genre) {
        parsedBody.genre = JSON.parse(parsedBody.genre)
      }
      if (parsedBody.year) {
        parsedBody.year = parseInt(parsedBody.year)
      }
      if (parsedBody.language) {
        parsedBody.language = JSON.parse(parsedBody.language)
      }
      if (parsedBody.subtitles) {
        parsedBody.subtitles = JSON.parse(parsedBody.subtitles)
      }
      parsedBody.animation = parsedBody.animation === 'true' ? true : false
      if (parsedBody.festivals) {
        parsedBody.festivals = JSON.parse(parsedBody.festivals)
      }
      if (parsedBody.awards) {
        parsedBody.awards = JSON.parse(parsedBody.awards)
      }
      if (parsedBody.reaInformation) {
        parsedBody.reaInformation = JSON.parse(parsedBody.reaInformation)
      }
      if (parsedBody.channels) {
        parsedBody.channels = JSON.parse(parsedBody.channels)
      }
      if (parsedBody.contact) {
        parsedBody.contact = JSON.parse(parsedBody.contact)
      }

      const newMovie = new Movie(parsedBody)
      const savedMovie = await newMovie.save()

      res.status(201).json(savedMovie)
    } catch (error) {
      res
        .status(400)
        .json({ error: 'Error al crear la película', details: error.message })
    }
  },
]

const deleteMovie = async (req, res) => {
  const id = req.params.id

  try {
    const movie = await Movie.findById(id)
    if (!movie) {
      return res
        .status(400)
        .json({ error: 'La película seleccionada no existe' })
    }
    await Movie.deleteOne({ _id: id })
    res.status(202).json(id)
  } catch (error) {
    res
      .status(400)
      .json({ error: 'No se pudo borrar la película', details: error.message })
  }
}

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  deleteMovie,
}
