const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    username: {//who announces this
        type: String,
        required: true
    },
    announceInformation: {//who announces this
        type: String,
        required: true
    },
    announcementTime: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model('announcements', announcementSchema)