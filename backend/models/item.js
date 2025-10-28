const mongoose = require('mongoose').default

const itemSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    deadline: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
itemSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
