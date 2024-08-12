const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const Movie = require('../models/Movie')
const { moviesInitialList } = require('./data_helpers')
const app = require('../app')

const api = supertest(app)

beforeEach(async() => {
  try {
    await Movie.deleteMany({})
    let movieObject = new Movie(moviesInitialList[0])
    await movieObject.save()
  } catch (error) {
    console.error(error)
  }

})

test('get all movies', async() => {
  const response = await api.get('/api/movies')
  assert.strictEqual(response.body.length, moviesInitialList.length)
})

after(async() => {
  await mongoose.connection.close()
})
