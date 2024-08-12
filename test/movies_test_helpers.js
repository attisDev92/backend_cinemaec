const Movie = require('../models/Movie')
const { moviesInitialList, newMovie } = require('./data_helpers')

const initMovies = async () => {
  for (let movie of moviesInitialList) {
    const movieObject = new Movie(movie)
    await movieObject.save()
  }
}

const getMovies = async () => {
  return await Movie.find({})
}

module.exports = {
  initMovies,
  getMovies,
}
