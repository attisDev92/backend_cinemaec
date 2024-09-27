import express from 'express'
import {
  createAdmin,
  loginAdmin,
  verifyLogin,
} from '../controllers/adminController.js'
import verifyAdminToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/', createAdmin)
router.post('/login', loginAdmin)
router.get('/login', verifyAdminToken, verifyLogin)

export default router
