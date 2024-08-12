const express = require('express')
const supertest = require('supertest')

const testServer = route => {
  const app = express()
  route(app)
  return supertest(app)
}

module.exports = testServer
