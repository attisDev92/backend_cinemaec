import express from 'express'
import verifyAdminToken from '../middlewares/verifyToken.js'
import uploadTempFiles from '../middlewares/multerConfig.js'
import {
  getAllMovies,
  getMovie,
  createMovie,
  editMovie,
  deleteMovie,
} from '../controllers/moviesController.js'
import {
  updateMovieFiles,
  deleteMovieFiles,
} from '../controllers/movieFilesController.js'

const router = express.Router()

router.put('/files/remove', verifyAdminToken, deleteMovieFiles)
router.put('/files', verifyAdminToken, uploadTempFiles.any(), updateMovieFiles)
router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/', verifyAdminToken, createMovie)
router.put('/:id', verifyAdminToken, editMovie)
router.delete('/:id', verifyAdminToken, deleteMovie)

export default router
