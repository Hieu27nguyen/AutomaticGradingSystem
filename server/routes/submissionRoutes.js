const express = require('express')
const router = express.Router()
const submissionController = require('../controllers/submissionController')

router.use(verifyJWT)

router.route('/')
    .get(submissionController.getAllSubmissions)
    .post(submissionController.createSubmission)
    .patch(submissionController.updateSubmission)
    .delete(submissionController.deleteSubmission)

module.exports = router