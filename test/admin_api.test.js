import supertest from 'supertest'
import app from '../src/app'
import {
  getAllAdmins,
  invalidAdmin,
  newAdmin,
  postAdmin,
} from './helpers/admin_test_helpers'
import Admin from '../src/models/Admin'
import Movie from '../src/models/Movie'

const api = supertest(app)

describe('API ADMIN tests', () => {
  beforeEach(async () => {
    await Admin.deleteMany({})
    await Movie.deleteMany({})
  })

  test('post new admin', async () => {
    const adminsBefore = await getAllAdmins()

    const response = await api
      .post('/api/admin')
      .send(newAdmin)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(response.body.username).toBe(newAdmin.username)
    expect(response.body.id).toBeDefined()

    const adminsAfter = await getAllAdmins()
    expect(adminsAfter.length).toBe(adminsBefore.length + 1)

    const adminCretedExist = adminsAfter.find(
      admin => admin.username === newAdmin.username,
    )
    expect(adminCretedExist).toBeDefined()
  })

  test('post new admin with invalid data', async () => {
    const response = await api.post('/api/admin').send(invalidAdmin).expect(400)

    expect(response.body.error).toMatch('datos invalidos')
    expect(response.body.adminToken).not.toBeDefined()

    const admins = await getAllAdmins()
    const adminCreatedExist = admins.find(
      admin => admin.id === response.body.id,
    )
    expect(adminCreatedExist).not.toBeDefined()
  })

  test('login', async () => {
    await postAdmin(newAdmin)
    const response = await api
      .post('/api/admin/login')
      .send(newAdmin)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.adminToken).toBeDefined()
    expect(response.body.username).toBe(newAdmin.username)
  })

  test('login with invalid user and password', async () => {
    const response = await api
      .post('/api/admin/login')
      .send(invalidAdmin)
      .expect(401)

    expect(response.body.error).toMatch('usuario o contraseña incorrectos')
    expect(response.body.adminToken).not.toBeDefined()
  })

  afterEach(async () => {
    await Admin.deleteMany({})
    await Movie.deleteMany({})
  })
})
