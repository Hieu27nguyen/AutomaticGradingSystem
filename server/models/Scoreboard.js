const mongoose = require('mongoose')

const scoreboardSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    contestID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    totalScore: {
        type: Number,
        required: true
    },
    submissionDetail: [
        {
            problemID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            attemptedTime: {
                type: Number,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
        }
    ],
    rank: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('scoreboard', scoreboardSchema)