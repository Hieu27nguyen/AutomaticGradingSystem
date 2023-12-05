const express = require('express')
const router = express.Router()
const submissionControllers = require('../controllers/submissionsController')

router.route('/')
    .get(submissionControllers.getAllSubmissions)
    .post(submissionControllers.createSubmission)

// Define a new route to get supported languages
router.route('/languages').get(submissionControllers.getSupportedLanguage);

//Get submission records by username
// Full URI: http://localhost:port/submission/username/:username
// Required field in request body:
router.route('/username/:username').get(submissionControllers.getSubmissionByUsername);

//Get submission records by id
// Full URI: http://localhost:port/submission/id/:id
// Required field in request body:
router.route('/id/:id').get(submissionControllers.getSubmissionByID);

module.exports = router