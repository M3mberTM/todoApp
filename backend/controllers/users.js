const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        email,
        passwordHash
    })

    user.save().then(savedUser => {
        res.status(201).json(savedUser)
    }).catch(err => next(err))
})

usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

usersRouter.delete('/:id', async (req, res) => {

})

usersRouter.put('/:id', async (req, res) => {

})

module.exports = usersRouter