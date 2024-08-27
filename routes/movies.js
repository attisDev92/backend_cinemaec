const express = require('express')
const { verifyAdminToken } = require('../middlewares/verifyToken')
const {
  getAllMovies,
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/moviesController')

const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/', verifyAdminToken, createMovie)
router.delete('/:id', verifyAdminToken, deleteMovie)

module.exports = router
