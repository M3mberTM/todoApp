const { test, describe, beforeEach, after } = require('node:test')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose').default
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const assert = require("node:assert")

const api = supertest(app)

describe('When there is only one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', email: 'something@gmail.com', passwordHash})

        await user.save()
    })

    test('User creation succeeds with a unique username and email with proper status code', async () => {
        const beginningUsers = await User.find({})

        const newUser = {
            username: 'richard',
            email: 'something2@gmail.com',
            password: 'something'
        }

        await api.post('/api/users/register').send(newUser).expect(201).expect('Content-Type', /application\/json/)

        const endUsers = await User.find({})
        assert.strictEqual(endUsers.length, beginningUsers.length + 1)
        const usernames = endUsers.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('User creation fails due to the same email with proper status', async () => {
        const beginningUsers = await User.find({})

        const newUser = {
            username: 'something',
            email: 'something@gmail.com',
            password: 'something'
        }

        const result = await api.post('/api/users/register').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('`username` and `email` must be unique'))
        const endUsers = await User.find({})
        assert.strictEqual(endUsers.length, beginningUsers.length)
    })

    test('User creation fail due to the same name with proper status', async () => {
        const beginningUsers = await User.find({})

        const newUser = {
            username: 'root',
            email: 'something2@gmail.com',
            password: 'something'
        }

        const result = await api.post('/api/users/register').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('`username` and `email` must be unique'))
        const endUsers = await User.find({})
        assert.strictEqual(endUsers.length, beginningUsers.length)

    })
})

after(async () => {
    await mongoose.connection.close()
})