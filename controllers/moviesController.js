const Movie = require('../models/Movie')
const Admin = require('../models/Admin')
const mongoose = require('mongoose')

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({})
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar las películas' })
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
    res.status(500).json({ error: 'Error al cargar la película' })
  }
}

const createMovie = async (req, res) => {
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
      .status(500)
      .json({ error: 'Error al crear la película', details: error.message })
  }
}

const editMovie = async (req, res) => {
  const { body, params } = req

  try {
    const movie = await Movie.findById(params.id)

    if (!movie) {
      return res
        .status(404)
        .json({ error: 'La película que intenta editar no existe' })
    }

    movie.set(body)
    const updatedMovie = await movie.save()
    res.status(200).json(updatedMovie)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al editar la película', details: error.message })
  }
}

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
    res.status(400).json({
      error: 'No se pudo eliminar la película',
      details: error.message,
    })
  }
}

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  editMovie,
  deleteMovie,
}
