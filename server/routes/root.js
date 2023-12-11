const express = require('express')
const router = express.Router()
const path = require('path')
/**
 * @swagger
 * tags:
 *  - name: Authentication
 *    description: |
 *     ##### IMPORTANT: Handle security with basic functionality like login, refresh and logout.
 *     ##### Run the User Mongo playground then execute this API before trying others with the pre-defined username and password. 
 *     ##### After successfully login, copy the access token and paste it in Authorize button before using other APIs. 
 * 
 *  - name: Translations
 *    description: |
 *     ##### Request translation for a particular word or phrase
 *     ##### Service provided by Google Cloud Translation API.
 * 
 *  - name: Announcements
 *    description: |
 *     ##### Allow Judges to communicate with all contestants during a contest.
 * 
 *  - name: Users
 *    description: |
 *     ##### Allow judges manage contestant.
 *     ##### Store users' credential and help with authentication.
 * 
 *  - name: Competitions
 *    description: |
 *     ##### Help judges configure a competition like start time and duration.
 *     ##### Contestants can also get the detail about competition here.
 * 
 *  - name: Problems
 *    description: |
 *     ##### Manage problems for the competition.
 * 
 *  - name: Scoreboard
 *    description: |
 *     ##### View the scoreboard of the current contest.
 * 
 *  - name: Submissions
 *    description: |
 *     ##### Help judges view all submissions
 *     ##### Please setup Judge0 before running submission.
 *     ##### Contestant can create and view their own submissions
 * 
 */
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router