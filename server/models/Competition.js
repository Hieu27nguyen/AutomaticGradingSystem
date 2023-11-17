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
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('competitions', userSchema)