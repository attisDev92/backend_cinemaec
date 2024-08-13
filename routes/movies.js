const express = require('express')
const { verifyAdminToken } = require('../middlewares/verifyToken')
const {
  getAllMovies,
  getMovie,
  createMovie,
} = require('../controllers/movies.controller')

const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/', verifyAdminToken, createMovie)

module.exports = router
