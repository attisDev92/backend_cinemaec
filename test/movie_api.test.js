const supertest = require('supertest')
const mongoose = require('mongoose')
const Movie = require('../models/Movie')
const app = require('../app')
const { initMovies } = require('./movie_test_helper')
const { moviesInitialList } = require('./data_helpers')

const api = supertest(app)

beforeEach(async () => {
  await initMovies()
}, 10000)

describe('test for get Movies with get to  api/movies', () => {
  test('fetch initial movies on database', async () => {
    const initialMovies = await api.get('api/movies')
    expect(initialMovies.length).toBe(moviesInitialList.length)
  })
})
