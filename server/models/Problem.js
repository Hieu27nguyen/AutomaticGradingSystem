const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, // Can be a text or PDF link
        required: true
    },
    test: {
        type: mongoose.Schema.Types.Mixed, //Array or zip
        required: true
    }
})

module.exports = mongoose.model('Problem', userSchema)