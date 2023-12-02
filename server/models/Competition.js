const mongoose = require('mongoose')

const competitionSchema = new mongoose.Schema({
    name: {
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

})

module.exports = mongoose.model('competitions', competitionSchema)