const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    timelimit: {
        type: int,
        required: true
    },
    difficulty: {
        type: String,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)