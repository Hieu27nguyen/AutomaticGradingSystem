const express = require('express')
const router = express.Router()
const scoreboardController = require('../controllers/scoreboardController')

//For security purposes, Scoreboard only have 1 route to get the current scoreboard
router.route('/')
    .get(scoreboardController.getScoreboard)


module.exports = router
