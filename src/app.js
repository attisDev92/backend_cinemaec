import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { requestLogger, unknownEndpoint } from './middlewares/infoRequest.js'
import { allowedOrigins } from './config/config.js'

import moviesRouter from './routes/movies.js'
import adminRouter from './routes/admin.js'

const app = express()

app.use(morgan(':method :url :status :response-time ms'))

if (process.env.NODE_ENV === 'development') {
  app.use(cors())
} else {
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
}

app.use(express.json())
app.use(requestLogger)

app.use('/api/movies', moviesRouter)
app.use('/api/admin', adminRouter)

app.use(unknownEndpoint)

export default app
