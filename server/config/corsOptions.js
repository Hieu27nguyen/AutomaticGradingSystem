const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        //Check if the origin matches with what we allow
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {//Allow CORS for developing and debugging purposes
            // if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 