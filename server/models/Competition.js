const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    timeStarted: {
        type: String,
        required: true
    },
    duration: {
        type : Number,
        default: 5,
        required: true
    },
    memLimit:{
        type : Number,
        required: true
    },
    timeLimit:{
        type : Number,
        required: true
    },

})

module.exports = mongoose.model('competitions', userSchema)