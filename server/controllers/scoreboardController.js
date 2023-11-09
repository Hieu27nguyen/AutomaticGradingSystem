const Scoreboard = require('../models/Scoreboard')
const User = require('../models/User')
const Problem = require('../models/Problem')
const asyncHandler = require('express-async-handler')


// @desc Get all users
// @route GET /users
// @access Private

// userID: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     unique: true
// },
// contestID: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     unique: true
// },
// totalScore: {
//     type: Number,
//     required: true
// },
// solvedProblem: {
//     type: Number,
//     required: true
// },
// submissionDetail: [
//     {
//         problemID: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true
//         },
//         attemptedTime: {
//             type: Number,
//             required: true
//         },
//         score: {
//             type: Number,
//             required: true
//         },
//     }
// ],


const getScoreboardRecords = asyncHandler(async (req, res) => {
    // Get all from the scoreboard from MongoDB
    const scoreboard = await Scoreboard.find().lean()

    // If no record yet 
    if (!scoreboard?.length) {
        return res.status(400).json({ message: 'No one record submission yet' })
    }

    res.json(scoreboard)
})

// @desc Create new user
// @route POST /users
// @access Private
const createRecord = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New record for user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateRecord = asyncHandler(async (req, res) => {
    const { id, username, roles, online, password } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof online !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.online = online

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteRecord = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getScoreboardRecords,
    createRecord,
    updateRecord,
    deleteRecord
}
