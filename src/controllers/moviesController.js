import Movie from '../models/Movie.js'
import Admin from '../models/Admin.js'

export const getAllMovies = async (_req, res) => {
  try {
    const movies = await Movie.find({})
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar las películas' })
  }
}

export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (movie) {
      res.json(movie)
    } else {
      res.status(404).json({ error: 'Película no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar la película' })
  }
}

export const createMovie = async (req, res) => {
  const { body, userToken } = req

  try {
    const admin = await Admin.findById(userToken.id)

    const newMovie = new Movie({
      ...body,
      createdBy: admin.id,
    })

    const savedMovie = await newMovie.save()
    res.status(201).json(savedMovie)
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al crear la película', details: error.message })
  }
}

export const editMovie = async (req, res) => {
  const { body, params } = req

  try {
    const movie = await Movie.findById(params.id)

    movie.set(body)
    const updatedMovie = await movie.save()
    res.status(200).json(updatedMovie)
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al editar la película', details: error.message })
  }
}

export const deleteMovie = async (req, res) => {
  const id = req.params.id

  try {
    const movie = await Movie.findById(id)
    await Movie.deleteOne({ _id: id })
    res.status(202).json(id)
  } catch (error) {
    res.status(400).json({
      error: 'No se pudo eliminar la película',
      details: error.message,
    })
  }
}
