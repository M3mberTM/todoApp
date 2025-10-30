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
        const startItems = await Item.find({})
        const newItem = {
            content: 'new todo item'
        }
        const result = await api.post('/api/items/').set('Authorization', `Bearer ${token}`).send(newItem).expect(201).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.content, newItem.content)
        assert.strictEqual(result.body.userId, initialUser.id)
        // 0 is the default priority
        assert.strictEqual(result.body.priority, 0)
        const endItems = await Item.find({})
        assert.strictEqual(startItems.length + 1, endItems.length)
    })

    test('Creating full new item works if the user is logged in with proper status', async () => {
        const startItems = await Item.find({})
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
        const endItems = await Item.find({})
        assert.strictEqual(startItems.length + 1, endItems.length)
    })

    test('Creating new item fails if the content is not provided with proper status', async () => {
        const startItems = await Item.find({})
        const newItem = {
            priority: 1,
            date: new Date().toISOString()
        }
        const result = await api.post('/api/items/').set('Authorization', `Bearer ${token}`).send(newItem).expect(400).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'Item validation failed: content: Path `content` is required.')
        const endItems = await Item.find({})
        assert.strictEqual(startItems.length, endItems.length)
    })

    test('Creating new item fails if the user is not logged in with proper status', async () => {
        const startItems = await Item.find({})
        const newItem = {
            content: 'new todo item',
            priority: 1,
            date: new Date().toISOString()
        }
        const result = await api.post('/api/items/').send(newItem).expect(401).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'token is invalid')
        const endItems = await Item.find({})
        assert.strictEqual(startItems.length, endItems.length)
    })
})

const newItems = [
    {
        content: 'Finish project documentation',
        priority: 2,
        deadline: '2025-11-10T17:00:00.000Z',
    },
    {
        content: 'Buy groceries for the weekend',
        priority: 1,
        deadline: '2025-11-02T18:30:00.000Z',
    },
    {
        content: 'Plan vacation itinerary',
        priority: 3,
        deadline: '2025-12-15T12:00:00.000Z',
    }
]

describe('Getting items', () => {
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

        for (let item of newItems) {
            let itemObject = new Item({ ...item, userId: initialUser.id })
            await itemObject.save()
        }
    })

    test('Getting all user items work if the user is logged in with proper status code', async () => {
        const result = await api.get('/api/items/').set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.length, newItems.length)
    })

    test('Getting all user items does not work if the user is not logged in with proper status code', async () => {
        const result = await api.get('/api/items/').expect(401).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'token is invalid')
    })
})

after(async () => {
    await mongoose.connection.close()
})
