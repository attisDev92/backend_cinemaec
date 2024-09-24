import supertest from 'supertest'
import app from '../src/app'

import Admin from '../src/models/Admin'
import Movie from '../src/models/Movie'
import { fetchInitMovies, getMovies } from './helpers/movies_test_helpers'
import { getAdminToken } from './helpers/admin_test_helpers'
import { invalidMovie, newMovie } from './helpers/movieData_helpers'

const api = supertest(app)

describe('API MOVIES tests', () => {
  beforeEach(async () => {
    await Admin.deleteMany({})
    await Movie.deleteMany({})
  })

  test('get all movies', async () => {
    const initialMovies = await fetchInitMovies()

    const response = await api
      .get('/api/movies/')
      .send()
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.length).toBe(initialMovies.length)
  })

  test('get a movie for id', async () => {
    const initialMovies = await fetchInitMovies()
    const movieToFind = initialMovies[0]

    const response = await api
      .get(`/api/movies/${movieToFind._id.toString()}`)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBe(movieToFind._id.toString())
    expect(response.body.title).toBe(movieToFind.title)
  })

  test('post new movie', async () => {
    const initialMovies = await fetchInitMovies()
    const adminToken = await getAdminToken()

    const response = await api
      .post('/api/movies/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newMovie)
      .expect(201)

    expect(response.body.id).toBeDefined()

    const moviesAfterCreateMovie = await getMovies()
    expect(moviesAfterCreateMovie.length).toBe(initialMovies.length + 1)

    const movieCreatedExist = moviesAfterCreateMovie.find(
      movie => movie.id === response.body.id,
    )
    expect(movieCreatedExist).toBeDefined()
    expect(movieCreatedExist.title).toBe(newMovie.title)
  })

  test('create new movie with invalid credentials', async () => {
    await fetchInitMovies()

    const response = await api.post('/api/movies/').send(newMovie).expect(401)
    expect(response.body.error).toMatch('Credenciales invalidas')
  })

  test('create new movie with invalid data', async () => {
    const initialMovies = await fetchInitMovies()
    const adminToken = await getAdminToken()

    const response = await api
      .post('/api/movies/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(invalidMovie)
      .expect(400)

    expect(response.body.id).not.toBeDefined()

    const moviesAfterCreateMovie = await getMovies()
    expect(moviesAfterCreateMovie.length).toBe(initialMovies.length)

    const movieCreatedExist = moviesAfterCreateMovie.find(
      movie => movie.id === response.body.id,
    )
    expect(movieCreatedExist).not.toBeDefined()
  })

  afterEach(async () => {
    await Admin.deleteMany({})
    await Movie.deleteMany({})
  })
})
