const { describe, test, after, beforeEach } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Movie = require('../models/Movie')
const Admin = require('../models/Admin')
const { moviesInitialList, newMovieObject } = require('./data_helpers')
const app = require('../app')
const { initMovies, getMovies } = require('./movies_test_helpers')
const { getAdminToken } = require('./admin_test_helpers')

const api = supertest(app)

beforeEach(async () => {
  await Movie.deleteMany({})
  await Admin.deleteMany({})
  await initMovies()
})

describe('GET request to api/movies', () => {
  let response, initialMoviesTitle

  beforeEach(async () => {
    response = await api.get('/api/movies')
    initialMoviesTitle = moviesInitialList.map(movie => movie.title)
  })

  test('get all movies', () => {
    assert.strictEqual(response.body.length, moviesInitialList.length)
  })

  test('movies from response have the same titles as initial movies', () => {
    const moviesTitle = response.body.map(movie => movie.title)
    assert.deepStrictEqual(moviesTitle, initialMoviesTitle)
  })

  test('titles do not match an incorrect list', () => {
    const wrongTitles = ['this title does not exist']
    const moviesTitle = response.body.map(movie => movie.title)
    assert.notDeepStrictEqual(moviesTitle, wrongTitles)
  })
})

describe('GET request with id to api/movies', () => {
  let initialMovie

  beforeEach(async () => {
    const movies = await getMovies()
    initialMovie = movies[0]
  })

  test('request movie with valid id returns the correct movie', async () => {
    const response = await api.get(`/api/movies/${initialMovie._id}`)
    assert.strictEqual(response.body.title, initialMovie.title)
  })

  test('request with invalid id returns 404', async () => {
    const invalidId = new mongoose.Types.ObjectId()
    const response = await api.get(`/api/movies/${invalidId}`)
    assert.strictEqual(response.status, 404)
  })
})

describe('POST request to api/movies', () => {
  let initialMovies
  let token

  beforeEach(async () => {
    await Admin.deleteMany({})
    initialMovies = await getMovies()
    const getToken = await getAdminToken()
    token = `Bearer ${getToken}`
  })

  test('create a new movie', async () => {
    const response = await api
      .post('/api/movies')
      .set('Authorization', token)
      .send(newMovieObject)
    assert.strictEqual(response.status, 201)
    const moviesAfterCreated = await getMovies()
    assert.strictEqual(moviesAfterCreated.length, initialMovies.length + 1)
    const createdMovie = moviesAfterCreated.find(
      movie => movie.title === newMovieObject.title,
    )
    assert.ok(createdMovie, 'New movie was not found in the list')
  })

  test('try to create a movie with missing properties', async () => {
    const invalidMovieObject = {
      title: 'movie',
      time: 70,
    }
    const response = await api
      .post('/api/movies')
      .set('Authorization', token)
      .send(invalidMovieObject)
    assert.strictEqual(response.status, 400)
    const moviesAfterCreated = await getMovies()
    assert.strictEqual(moviesAfterCreated.length, initialMovies.length)
    const createdMovie = moviesAfterCreated.find(
      movie => movie.title === invalidMovieObject.title,
    )
    assert.equal(createdMovie, null)
  })
})

describe('Delete a movie', () => {
  let initialMovies
  let token

  beforeEach(async () => {
    initialMovies = await getMovies()
    const getToken = await getAdminToken()
    token = `Bearer ${getToken}`
  })

  test('delete a movie by correct id', async () => {
    const movieForDelete = initialMovies[0]

    const deletedMovie = await api
      .delete(`/api/movies/${movieForDelete.id}`)
      .set('Authorization', token)

    assert.strictEqual(deletedMovie.status, 202)

    const moviesAfter = await getMovies()
    const movieDeletedNotExist = moviesAfter.find(
      movie => movie._id === movieForDelete._id,
    )
    assert.strictEqual(movieDeletedNotExist, undefined)
  })

  test('unvalid id delete', async () => {
    const deletedMovie = await api
      .delete(`/api/movies/834623480989`)
      .set('Authorization', token)

    assert.strictEqual(deletedMovie.status, 400)
  })
})

after(async () => {
  await Admin.deleteMany({})
  await Movie.deleteMany({})
  await mongoose.connection.close()
})
