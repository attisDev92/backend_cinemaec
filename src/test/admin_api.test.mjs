import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)

test.only('test', () => {
  let uno = 1
  expect(uno).toBe(1)
})
