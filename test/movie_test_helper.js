const Movie = require('../models/Movie')
const { moviesInitialList } = require('./data_helpers')

const initMovies = async () => {
  for (let movie of moviesInitialList) {
    const newMovie = new Movie(movie)
    await newMovie.save()
  }
}

module.exports = {
  initMovies,
}
