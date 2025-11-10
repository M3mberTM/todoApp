const mongoose = require('mongoose').default

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minLength: 7,
        maxLength: 256,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
}, { timestamps: true })
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User