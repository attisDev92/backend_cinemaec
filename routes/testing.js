const { resetDatabase } = require('../controllers/testingController')

const testingRouter = require('express').Router()

testingRouter.post('/reset', resetDatabase)

module.exports = testingRouter
