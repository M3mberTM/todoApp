const { test, describe, beforeEach, after, before } = require('node:test')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose').default
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const initialUser = {
    username: 'rootUser',
    email: 'root@gmail.com',
    password: 'sekret',
    id: null
}

const extraUser ={
    username: 'extraUser',
    email: 'something2@gmail.com',
    password: 'sekret2',
    id: null
}

let token = ''

describe('Registering when there is only one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', email: 'something@gmail.com', passwordHash })

        await user.save()
    })

    test('User creation succeeds with a unique username and email with proper status code', async () => {
        const beginningUsers = await User.find({})

        const newUser = {
            username: 'richard',
            email: 'something2@gmail.com',
            password: 'something'
        }

        await api.post('/api/register').send(newUser).expect(201).expect('Content-Type', /application\/json/)

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

        const result = await api.post('/api/register').send(newUser).expect(400).expect('Content-Type', /application\/json/)

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

        const result = await api.post('/api/register').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('`username` and `email` must be unique'))
        const endUsers = await User.find({})
        assert.strictEqual(endUsers.length, beginningUsers.length)

    })
})

describe('Logging in with one user in the db', () => {
    before(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', email: 'something@gmail.com', passwordHash })

        await user.save()
    })

    test('User logs in successfully if he provides the password and email with proper status', async () => {

        const loginCredentials = {
            password: 'sekret',
            email: 'something@gmail.com'
        }

        const result = await api.post('/api/login').send(loginCredentials).expect(200).expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.email, loginCredentials.email)
        assert(result.body.username.length > 0)
        assert(result.body.token.length > 0)
    })

    test('User cannot log in with the wrong password with proper status', async () => {

        const loginCredentials = {
            password: 'wrongPassword',
            email: 'something@gmail.com'
        }

        const result = await api.post('/api/login').send(loginCredentials).expect(401).expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'invalid email or password')
    })

    test('User cannot log in if the email does not exist with proper status', async () => {

        const loginCredentials = {
            password: 'sekret',
            email: 'doesnotexist@gmail.com'
        }

        const result = await api.post('/api/login').send(loginCredentials).expect(401).expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.error, 'invalid email or password')
    })
})

describe('User updating', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash(initialUser.password, 10)

        const newUser = {
            username: initialUser.username,
            email: initialUser.email,
            passwordHash
        }
        const user = new User(newUser)

        await user.save()
        const loginResult = await api.post('/api/login').send({ email: initialUser.email, password: initialUser.password })
        token = loginResult.body.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        initialUser.id = decodedToken.id
        const extraPasswordHash = await bcrypt.hash(extraUser.password, 10)

        const extraNewUser = {
            username: extraUser.username,
            email: extraUser.email,
            passwordHash: extraPasswordHash
        }
        const secondUser = new User(extraNewUser)

        await secondUser.save()
        const secondDbUser = await User.find({ email: extraUser.email })
        extraUser.id = secondDbUser.id
    })

    test('Updating user email and username while logged in works with proper status', async () => {

        const updatedUser = {
            email: 'newmail@gmail.com',
            username: 'root2'
        }
        const result = await api.put(`/api/users/${initialUser.id}`).set('Authorization', `Bearer ${token}`).send(updatedUser).expect(200).expect('Content-Type',/application\/json/)
        assert.strictEqual(result.body.email, updatedUser.email)
        assert.strictEqual(result.body.username, updatedUser.username)
    })

    test('Updating user fails if user is not logged in with proper status ', async () => {

        const updatedUser = {
            email: 'newmail@gmail.com',
            username: 'root2'
        }
        const result = await api.put(`/api/users/${initialUser.id}`).send(updatedUser).expect(401).expect('Content-Type',/application\/json/)
        assert.strictEqual(result.body.error, 'token is invalid')
    })

    test('Updating user fails if user is not logged in to himself with proper status ', async () => {

        const updatedUser = {
            email: 'newmail@gmail.com',
            username: 'root2'
        }
        const result = await api.put(`/api/users/${extraUser.id}`).set('Authorization', `Bearer ${token}`).send(updatedUser).expect(403).expect('Content-Type',/application\/json/)
        assert.strictEqual(result.body.error, 'Forbidden: You are not allowed to edit other users')
    })
})

after(async () => {
    await mongoose.connection.close()
})
