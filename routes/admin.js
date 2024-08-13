const express = require('express')
const {
  createAdmin,
  loginAdmin,
} = require('../controllers/admin.controller')

const router = express.Router()

router.post('/', createAdmin)
router.post('/login', loginAdmin)

module.exports = router