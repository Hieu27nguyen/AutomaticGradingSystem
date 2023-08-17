const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, // Can be a text or PDF link
        required: true
    },
    judgeProgram: {
        type: String, // Can be a text or PDF link
        required: false
    },
    test: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('Problem', userSchema)