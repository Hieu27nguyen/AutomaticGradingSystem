const mongoose = require('mongoose')

const judgeConfigSchema = new mongoose.Schema({
    memory_limit: {
        type: Number,
        required: true
    },
    cpu_time_limit: {
        type: Number,
        required: true
    },
    cpu_extra_time: {
        type: Number,
        required: true
    },
    // stack_limit: {
    //     type: Number,
    //     required: true
    // },
    // max_queue_size: {
    //     type: Number,
    //     required: true
    // }
}); //For JudgeO

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
    memLimit:{
        type : Number,
        required: false
    },
    timeLimit:{
        type : Number,
        required: false
    },
    judgeConfig: {
        type: judgeConfigSchema,
        required: false
    }
})

module.exports = mongoose.model('competitions', userSchema)