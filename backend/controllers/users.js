const usersRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', middleware.userExtractor, async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(201).json(user)
})

usersRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const userId = req.params.id
    if (userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: You are not allowed to edit other users' })
    }
    if (!req.body.currentPassword) {
        return res.status(400).json({ error: '`currentPassword` required while editing sensitive fields' })
    }
    const passwordCorrect = await bcrypt.compare(req.body.currentPassword, req.user.passwordHash)
    if (!passwordCorrect) {
        return res.status(401).json({ error: 'invalid password' })
    }
    await User.findByIdAndDelete(userId)
    res.status(204).end()
})

usersRouter.put('/:id', middleware.userExtractor, async (req, res) => {
    const userId = req.params.id
    if (userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: You are not allowed to edit other users' })
    }
    const sensitiveFields = Object.keys(req.body).filter(field => {
        return field === 'email' || field === 'password'
    })
    let data = {}
    if (sensitiveFields.length > 0) {
        // if the user wants to change his password or email which might be used in the recovery of the account, require password as well
        if (!req.body.currentPassword) {
            return res.status(400).json({ error: '`currentPassword` required while editing sensitive fields' })
        }
        const passwordCorrect = await bcrypt.compare(req.body.currentPassword, req.user.passwordHash)
        if (!passwordCorrect) {
            return res.status(401).json({ error: 'invalid password' })
        }
        const { currentPassword, ...updatedData } = req.body
        data = { ...updatedData }
    } else {
        data = req.body
    }
    if (!req.body.password) {
        User.findByIdAndUpdate(userId, data, { new: true }).then(updated => {
            res.status(200).json(updated)
        }).catch((err) => {
            res.status(400).json({ error: err.message  })
        })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(data.password, saltRounds)
        const newUser = {
            ...data,
            password: passwordHash
        }
        User.findByIdAndUpdate(userId, newUser, { new: true }).then(updated => {
            res.status(200).json(updated)
        }).catch((err) => {
            res.status(400).json({ error: err.message })
        })
    }
})

module.exports = usersRouter