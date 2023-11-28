const mongoose = require('mongoose')

const competitionSchema = new mongoose.Schema({
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
    processTimeStart: {
        type: Date,
        default: Date.now,
        required: true
    },
    duration: {
        type : Number,
        default: 5,
        required: true
    },
    paused: {
        type: Boolean,
        default: false,
        required: true
    },
    extended: {
        type: Boolean,
        default: false,
        required: true
    },
    pausedTime: {
        type: String,
        required: false
    },
    extendedTime: {
        type: String,
        required: false
    },

})

module.exports = mongoose.model('competitions', competitionSchema)