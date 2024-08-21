const { describe, test, after, beforeEach } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const {
  postAdmin,
  getAllAdmins,
  newAdmin,
  adminObject,
} = require('./admin_test_helpers')
const Admin = require('../models/Admin')

const api = supertest(app)

let initialAdmins

beforeEach(async () => {
  await Admin.deleteMany({})

  initialAdmins = await getAllAdmins()
})

describe('create a new admin on /api/admin', () => {
  let adminsUsername

  beforeEach(async () => {
    adminsUsername = initialAdmins.map(admin => admin.username)
  })

  test('create new admin', async () => {
    const response = await api.post('/api/admin').send(newAdmin)
    assert.strictEqual(response.status, 201)

    const adminsAfter = await getAllAdmins()
    assert.strictEqual(adminsAfter.length, initialAdmins.length + 1)

    const adminExist = adminsAfter.find(
      admin => admin.username === newAdmin.username,
    )
    assert.ok(adminExist, "username doesn't exist")
  })

  test('create admin with invalid user data', async () => {
    const response = await api
      .post('/api/admin')
      .send({ username: 'invalid user' })
    assert.strictEqual(response.status, 500)

    const adminsAfter = await getAllAdmins()
    assert.deepEqual(adminsAfter, initialAdmins)

    const adminName = adminsUsername.find(
      username => username === newAdmin.username,
    )
    assert.strictEqual(adminName, undefined)
  })
})

describe('login on /api/admin', () => {
  let initialAdmin

  beforeEach(async () => {
    initialAdmin = await postAdmin()
  })

  test('login with correct admin data', async () => {
    const response = await api.post('/api/admin/login').send(adminObject)
    assert.strictEqual(response.status, 200)
    assert.deepEqual(adminObject.username, initialAdmin.username)
  })

  test('login admin with invalid data', async () => {
    const response = await api
      .post('/api/admin/login')
      .send({ username: 'passworng', password: 'invalidPassword' })
    assert.strictEqual(response.status, 401)
  })
})

after(async () => {
  await mongoose.connection.close()
})
