const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const infoMiddleware = require('./middlewares/infoRequest.middleware')

const app = express()

app.use(morgan(':method :url :status :response-time ms'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(infoMiddleware.requestLogger)

app.get('/hola', (req, res) => {
  console.log(req)
  res.send('hola mundo').status(200)
})

app.use(infoMiddleware.unknownEndpoint)

module.exports = app
