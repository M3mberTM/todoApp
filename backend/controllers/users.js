const usersRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')
const bcrypt = require('bcrypt')

/*
usersRouter.delete('/:id', async (req, res) => {

})
 */

usersRouter.put('/:id', middleware.userExtractor, async (req, res) => {
    // user should be able to update username, email or even a password if they are logged in
    const userId = req.params.id
    if (userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: You are not allowed to edit other users' })
    }
    if (!req.body.password) {
        User.findByIdAndUpdate(userId, req.body, { new: true }).then(updated => {
            res.status(200).json(updated)
        }).catch(() => {
            res.status(400).json({ error: 'Invalid format of fields' })
        })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
        const newUser = {
            ...req.body,
            password: passwordHash
        }
        User.findByIdAndUpdate(userId, newUser, { new: true }).then(updated => {
            res.status(200).json(updated)
        }).catch(() => {
            res.status(400).json({ error: 'Invalid format of fields' })
        })
    }
})

module.exports = usersRouter