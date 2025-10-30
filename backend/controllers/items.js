const itemRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Item = require('../models/item')

itemRouter.get('/', middleware.userExtractor, async (req, res) => {
    const items = await Item.find({ userId: req.user.id })
    res.status(201).json(items)
})

itemRouter.post('/', middleware.userExtractor, async (req, res) => {
    const body = req.body
    const user = req.user

    const item = new Item({
        content: body.content,
        priority: body.priority,
        deadline: body.deadline,
        userId: user.id
    })

    const savedItem = await item.save()
    res.status(201).json(savedItem)
})

module.exports = itemRouter