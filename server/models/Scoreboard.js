const mongoose = require('mongoose')

const scoreboardSchema = new mongoose.Schema({
    username: {//username of the contestant
        type: String,
        required: true
    },
    problemSolved: {

    },
    totalScore:{//Total score achieved

    },

    problemStatistic: [{//Containing detail submission records
        problemID: String,
        ref: 'Problem',
        required: true,
        submissionRecord: { //Keep track of submission attempts, penalty and score for each problem


        }
    }],

})

module.exports = mongoose.model('scoreboard', scoreboardSchema)