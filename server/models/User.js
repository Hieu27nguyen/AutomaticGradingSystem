const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        default: "contestant"
    }],
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)