const mongoose = require('mongoose').default

const itemSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 1
    },
    priority: {
        type: Number,
        min: 0,
        max: 3,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })
itemSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
