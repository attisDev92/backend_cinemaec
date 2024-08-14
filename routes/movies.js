const express = require('express')
const { verifyAdminToken } = require('../middlewares/verifyToken')
const {
  getAllMovies,
  getMovie,
  createMovie,
} = require('../controllers/moviesController')

const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/', verifyAdminToken, createMovie)

module.exports = router
