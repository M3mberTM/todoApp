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

const extraUser ={
    username: 'extraUser',
    email: 'something2@gmail.com',
    password: 'sekret2',
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


describe('Updating items', () => {
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
        const extraPasswordHash = await bcrypt.hash(extraUser.password, 10)

        const extraNewUser = {
            username: extraUser.username,
            email: extraUser.email,
            passwordHash: extraPasswordHash
        }
        const secondUser = new User(extraNewUser)

        await secondUser.save()
        const secondDbUser = await User.findOne({ email: extraUser.email })
        extraUser.id = secondDbUser.id

        for (let item of newItems) {
            let itemObject = null
            if (item.content.includes('groceries')) {
                itemObject = new Item({ ...item, userId: extraUser.id })
            } else {
                itemObject = new Item({ ...item, userId: initialUser.id })
            }
            let itemResult = await itemObject.save()
            item.id = itemResult.id.toString()
        }
    })

    test('Updating an item works if the user is logged in with proper status code', async () => {
        const newItem = {
            content: 'new todo item',
            priority: 0,
            deadline: new Date().toISOString()
        }
        const result = await api.put(`/api/items/${newItems[0].id}`).set('Authorization', `Bearer ${token}`).send(newItem).expect(201).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.content, newItem.content)
    })

    test('Updating an item does not work if the user is not logged in with proper status code', async () => {
        const newItem = {
            content: 'new todo item',
            priority: 0,
            deadline: new Date().toISOString()
        }
        const result = await api.put(`/api/items/${newItems[0].id}`).send(newItem).expect(401).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'token is invalid')
    })

    test('Updating an item does not work if it does not belong to the logged in user with proper status code', async () => {
        const newItem = {
            content: 'new todo item',
            priority: 0,
            deadline: new Date().toISOString()
        }
        const result = await api.put(`/api/items/${newItems[1].id}`).set('Authorization', `Bearer ${token}`).send(newItem).expect(403).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'Forbidden: This item belongs to a different user')
    })

    test('If the item does not exits, user receives 404 status code', async () => {
        const newItem = {
            content: 'new todo item',
            priority: 0,
            deadline: new Date().toISOString()
        }
        const result = await api.put('/api/items/a193274').set('Authorization', `Bearer ${token}`).send(newItem).expect(404).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'This id does not exist')
    })
})

describe('Item deletion', () => {
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
        const extraPasswordHash = await bcrypt.hash(extraUser.password, 10)

        const extraNewUser = {
            username: extraUser.username,
            email: extraUser.email,
            passwordHash: extraPasswordHash
        }
        const secondUser = new User(extraNewUser)

        await secondUser.save()
        const secondDbUser = await User.findOne({ email: extraUser.email })
        extraUser.id = secondDbUser.id

        for (let item of newItems) {
            let itemObject = null
            if (item.content.includes('groceries')) {
                itemObject = new Item({ ...item, userId: extraUser.id })
            } else {
                itemObject = new Item({ ...item, userId: initialUser.id })
            }
            let itemResult = await itemObject.save()
            item.id = itemResult.id.toString()
        }
    })

    test('Deleting an item works if it belong to the user that is logged in with proper status code', async () => {
        const startItems = await Item.find({})
        await api.delete(`/api/items/${newItems[0].id}`).set('Authorization', `Bearer ${token}`).expect(204)
        const endItems = await Item.find({})
        assert.strictEqual(startItems.length - 1, endItems.length)
    })

    test('Deleting an item does not work if the user is not logged in with proper status code', async () => {
        const startItems = await Item.find({})
        const result = await api.delete(`/api/items/${newItems[0].id}`).expect(401).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'token is invalid')
        const endItems = await Item.find({})
        assert.strictEqual(startItems.length, endItems.length)
    })

    test('Deleting an item does not work if the user tries to delete a different users item with proper status code', async () => {
        const startItems = await Item.find({})
        const result = await api.delete(`/api/items/${newItems[1].id}`).set('Authorization', `Bearer ${token}`).expect(403).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'Forbidden: This item belongs to a different user')
        const endItems = await Item.find({})
        assert.strictEqual(startItems.length, endItems.length)
    })

    test('Deleting an item does not work if the item does not exist with proper status code', async () => {
        const result = await api.delete('/api/items/aljasd89').set('Authorization', `Bearer ${token}`).expect(404).expect('Content-Type', /application\/json/)
        assert.strictEqual(result.body.error, 'This id does not exist')
    })
})
after(async () => {
    await mongoose.connection.close()
})
