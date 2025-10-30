const { test, describe, beforeEach, after } = require('node:test')
const mongoose = require('mongoose').default
const supertest = require('supertest')
const Item = require('../models/item')
const User = require('../models/user')
const app = require('../app')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialUser = {
    username: 'rootUser',
    email: 'root@gmail.com',
    password: 'sekret',
    id: null
}

let token = null

describe('Creating new items', () => {
    beforeEach(async () => {
        await Item.deleteMany({})
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
    })

    test('Creating new item with content works if the user is logged in and provides the required fields with proper status', async () => {
        const newItem = {
            content: 'new todo item'
        }
        const result = await api.post('/api/items/').set('Authorization', `Bearer ${token}`).send(newItem).expect(201).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.content, newItem.content)
        assert.strictEqual(result.body.userId, initialUser.id)
        // 0 is the default priority
        assert.strictEqual(result.body.priority, 0)
    })

    test('Creating full new item works if the user is logged in with proper status', async () => {
        const newItem = {
            content: 'new todo item',
            priority: 1,
            deadline: new Date().toISOString()
        }
        const result = await api.post('/api/items/').set('Authorization', `Bearer ${token}`).send(newItem).expect(201).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.content, newItem.content)
        assert.strictEqual(result.body.userId, initialUser.id)
        assert.strictEqual(result.body.priority, newItem.priority)
        assert.strictEqual(result.body.deadline, newItem.deadline)
    })

    test('Creating new item fails if the content is not provided with proper status', async () => {
        const newItem = {
            priority: 1,
            date: new Date().toISOString()
        }
        const result = await api.post('/api/items/').set('Authorization', `Bearer ${token}`).send(newItem).expect(400).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'Item validation failed: content: Path `content` is required.')
    })

    test('Creating new item fails if the user is not logged in with proper status', async () => {
        const newItem = {
            content: 'new todo item',
            priority: 1,
            date: new Date().toISOString()
        }
        const result = await api.post('/api/items/').send(newItem).expect(401).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'token is invalid')
    })
})

describe('Getting items', () => {

})

after(async () => {
    await mongoose.connection.close()
})
