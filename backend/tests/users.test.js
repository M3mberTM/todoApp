const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('ping test', async () => {
  await api
    .get('/ping').expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})