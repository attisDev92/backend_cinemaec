const express = require('express')
const {
  getAllMovies,
  getMovie,
  createMovie,
} = require('../controllers/movies.controller')

const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/', createMovie)

module.exports = router
