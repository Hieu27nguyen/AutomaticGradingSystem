const mongoose = require('mongoose')

const clarificationSchema = new mongoose.Schema({
    username: {//who request this clarification
        type: String,
        required: true
    },
    clarificationQuestion: {//who announces this
        type: String,
        required: true
    },
    clarificationTime: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('clarifications', clarificationSchema)