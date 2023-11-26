const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    }
})

module.exports = mongoose.model('Problem', problemSchema)