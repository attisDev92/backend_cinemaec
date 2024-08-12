const { resetDatabase } = require('../controllers/testing.controller')

const testingRouter = require('express').Router()

testingRouter.post('/reset', resetDatabase)

module.exports = testingRouter
