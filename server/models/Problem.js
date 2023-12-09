const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String, // Can be a text or PDF link
        required: true
    },
    judgeProgram: {
        type: String, 
        required: false
    },
    test: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: false
        }
    }],

    //In kilobytes 
    memLimit:{
        type : Number,
        required: false,
        default: 128000,
    },
    //in seconds
    timeLimit:{
        type : Number,
        required: false,
        default: 2,
    },
    //Penalty in minute which will incur if user attemped this problem but get this wrong.
    //Penalty only applied when the user solved this problem.
    penaltyMinute:{
        type : Number,
        required: false,
        default: 20,//20 minutes penalty as default
    }
})

module.exports = mongoose.model('Problem', problemSchema)