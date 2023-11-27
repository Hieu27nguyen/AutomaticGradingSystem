const express = require('express')
const router = express.Router()
const submissionControllers = require('../controllers/submissionsController')

router.route('/')
    .get(submissionControllers.getAllSubmissions)
    .post(submissionControllers.createSubmission)
    .patch(submissionControllers.updateSubmission)
    .delete(submissionControllers.deleteSubmission)

// Define a new route to get supported languages
router.route('/languages').get(submissionControllers.getSupportedLanguage);

module.exports = router