const accessRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

accessRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        email,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

accessRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        // don't say that email does not exist to avoid user enumeration vulnerability
        return res.status(401).json({
            error: 'invalid email or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({ token, username: user.username, email: user.email })
})
module.exports = accessRouter