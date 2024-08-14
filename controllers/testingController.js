const Movie = require('../models/Movie')
const logger = require('../utils/logger')

const resetDatabase = async (req, res) => {
  try {
    await Movie.deleteMany({})
  } catch (error) {
    logger.error('Error to delete database testing', error.message)
  }
}

module.exports = {
  resetDatabase,
}
