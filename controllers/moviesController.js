const Movie = require('../models/Movie')

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

const createMovie = async (req, res) => {
  const newMovie = new Movie({
    ...req.body,
    expiration: req.body.expiration || null,
    stills: req.body.stills || [],
    subtitles: req.body.subtitles || [],
    festivals: req.body.festivals || [],
    awards: req.body.awards || [],
    availableForREA: req.body.availableForREA || false,
    territoryLicense: req.body.territoryLicense || [],
  })

  try {
    const savedMovie = await newMovie.save()
    res.status(201).json(savedMovie)
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al crear la película', details: error.message })
  }
}

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
}
