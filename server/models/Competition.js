const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: {
        type:  mongoose.Schema.Types.ObjectId, 
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
    timeStarted: {
        type: String,
        required: true
    },
    duration: {
        type : Number,
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