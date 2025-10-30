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

itemRouter.put('/:id', middleware.userExtractor, async (req, res) => {
    const itemId = req.params.id
    const item = await Item.findById(itemId)
    if (!item) {
        return res.status(404).json({ error: 'Item not found' })
    }
    if (item.userId.toString() !== req.user.id){
        return res.status(403).json({ error: 'Forbidden: This item belongs to a different user' })
    }

    item.content = req.body.content ?? item.content
    item.priority = req.body.priority ?? item.priority
    if (item.deadline) {
        item.deadline = req.body.deadline ?? item.deadline
    }
    await item.save()
    res.status(201).json(item)
})

module.exports = itemRouter