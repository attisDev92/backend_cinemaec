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

  test('edit movie', async () => {
    const initialMovies = await fetchInitMovies()
    const adminToken = await getAdminToken()
    const movieToUpdate = initialMovies[0]

    const response = await api
      .put(`/api/movies/${movieToUpdate._id.toString()}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Película editada' })
      .expect(200)

    expect(response.body.title).toMatch('Película editada')
    expect(response.body.id).toBe(movieToUpdate._id.toString())
  })

  test('edit movie withou credentials', async () => {
    const initialMovies = await fetchInitMovies()
    const movieToUpdate = initialMovies[0]

    const response = await api
      .put(`/api/movies/${movieToUpdate._id.toString()}`)
      .send({ title: 'Película editada' })
      .expect(401)

    expect(response.body.error).toMatch('Credenciales invalidas')

    const moviesAfterEdit = await getMovies()
    expect(moviesAfterEdit[0].title).toBe(movieToUpdate.title)
  })

  test('edit movie with invalid data', async () => {
    const initialMovies = await fetchInitMovies()
    const adminToken = await getAdminToken()
    const movieToUpdate = initialMovies[0]

    const response = await api
      .put(`/api/movies/${movieToUpdate._id.toString()}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: '' })
      .expect(400)

    expect(response.body.error).toMatch('Error al editar la película')
    expect(response.body.title).not.toBeDefined()

    const moviesAfterEdit = await getMovies()
    expect(movieToUpdate.title).toBe(moviesAfterEdit[0].title)
  })

  test('edit movie that not exist', async () => {
    const initialMovies = await fetchInitMovies()
    const adminToken = await getAdminToken()
    const invalidId = '12875304956749564'

    const response = await api
      .put(`/api/movies/${invalidId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Película editada' })
      .expect(400)

    expect(response.body.error).toMatch('Error al editar la película')

    const moviesAfterEdit = await getMovies()
    expect(moviesAfterEdit[0].title).toBe(initialMovies[0].title)
  })

  test('delete a movie', async () => {
    const initialMovies = await fetchInitMovies()
    const adminToken = await getAdminToken()
    const movieToDelete = initialMovies[0]

    const response = await api
      .delete(`/api/movies/${movieToDelete._id.toString()}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send()
      .expect(202)

    expect(response.body).toBe(movieToDelete.id)

    const moviesAfterDelte = await getMovies()
    const movieDeletedExist = moviesAfterDelte.find(
      movie => movie.id === response.body,
    )

    expect(movieDeletedExist).not.toBeDefined()
  })

  test('delete a movie without credentials', async () => {
    const initialMovies = await fetchInitMovies()
    const movieToDelete = initialMovies[0]

    const response = await api
      .delete(`/api/movies/${movieToDelete._id.toString()}`)
      .send()
      .expect(401)

    expect(response.body.error).toMatch('Credenciales invalidas')

    const moviesAfterDelte = await getMovies()
    expect(moviesAfterDelte.length).toBe(initialMovies.length)
  })

  test('delete a movie with invalid data', async () => {
    const initialMovies = await fetchInitMovies()
    const adminToken = await getAdminToken()
    const invalidId = '823479287349823'

    const response = await api
      .delete(`/api/movies/${invalidId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send()
      .expect(400)
    console.log(response.body)
    expect(response.body.error).toMatch('No se pudo eliminar la película')

    const moviesAfterDelte = await getMovies()
    expect(moviesAfterDelte.length).toBe(initialMovies.length)
  })

  afterEach(async () => {
    await Admin.deleteMany({})
    await Movie.deleteMany({})
  })
})
