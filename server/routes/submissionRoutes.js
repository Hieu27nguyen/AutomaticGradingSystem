const express = require('express')
const router = express.Router()
const submissionControllers = require('../controllers/submissionsController')
const verifyJWT = require('../middleware/verifyJWT')
const { GET_SUPPORTED_LANGUAGES } = require('../middleware/submissionRunner');


router.use(verifyJWT)

router.route('/')
    .get(submissionControllers.getAllSubmissions)
    .post(submissionControllers.createSubmission)
    .patch(submissionControllers.updateSubmission)
    .delete(submissionControllers.deleteSubmission)

// Define a new route to get supported languages
router.route('/languages')
  .get(async (req, res) => {
    // console.log("TESTING ROUTE");
    try {
      // console.log("TESTING ROUTE");
      const supportedLanguages = await GET_SUPPORTED_LANGUAGES();
      console.log("TEST METHOD" , GET_SUPPORTED_LANGUAGES());
      res.json({ supportedLanguages });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching supported languages' });
    }
});
module.exports = router