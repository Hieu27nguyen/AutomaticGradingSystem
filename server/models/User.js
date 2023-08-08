const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        required: true
    },
    roles: [{
        type: String,
        default: "contestant"
    }],
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)