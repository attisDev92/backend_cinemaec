const Movie = require('../models/Movie')
const { createAdmin } = require('./admin_test_helpers')
const { moviesInitialList } = require('./data_helpers')

const initMovies = async () => {
  const admin = await createAdmin()
  for (let movie of moviesInitialList) {
    const movieObject = new Movie({ ...movie, createdBy: admin.id })
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
