import { info } from '../utils/logger.js'

export const requestLogger = (req, _res, next) => {
  info('Method:', req.method)
  info('Path:  ', req.path)
  info('Body:  ', req.body)
  info('---')
  next()
}

export const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
