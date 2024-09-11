const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const infoMiddleware = require('./middlewares/infoRequest')
const { allowedOrigins } = require('./utils/config')

const moviesRouter = require('./routes/movies')
const adminRouter = require('./routes/admin')

require('./database/db')

const app = express()

app.use(morgan(':method :url :status :response-time ms'))
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('No permitido por CORS'))
      }
    },
    credentials: true,
  }),
)
app.use(express.static('build'))
app.use(express.json())
app.use(infoMiddleware.requestLogger)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/testing')
  app.use('/api/testing', testingRouter)
}

app.use('/api/movies', moviesRouter)
app.use('/api/admin', adminRouter)

app.use(infoMiddleware.unknownEndpoint)

module.exports = app
