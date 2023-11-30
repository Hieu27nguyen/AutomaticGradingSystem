const mongoose = require('mongoose')

const scoreboardSchema = new mongoose.Schema({
    username: {//username of the contestant
        type: String,
        ref: 'User',
        required: true
    },
    problemSolved: {
        type: Number,
        required: true
    },
    totalScore: {//Total score achieved
        type: Number,
        required: true
    },

    problemStatistic: [{//Containing detail submission records
        problemID: {
            type: String,
            ref: 'Problem',
            required: true,
        },
        //Keep track of submission attempts, penalty and score for each problem
        attempts: {
            type: Number,
            required: true,
        },
        penalty: {
            type: Number,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
       
    }],

})

module.exports = mongoose.model('scoreboard', scoreboardSchema)