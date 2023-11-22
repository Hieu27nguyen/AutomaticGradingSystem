const mongoose = require('mongoose')

const clarificationSchema = new mongoose.Schema({
    username: {//who request this clarification
        type: String,
        required: true
    },
    rank:{
        type: Number,
        
    }
})

module.exports = mongoose.model('clarifications', clarificationSchema)