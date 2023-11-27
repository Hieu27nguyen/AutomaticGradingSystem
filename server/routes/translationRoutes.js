const express = require('express')
const router = express.Router()
const translationController = require('../controllers/translationController')

router.route('/')
    // Get all translation
    // Full URI: http://localhost:port/translation/languages/
    // Required field in request body:
    .get(translationController.getAllTranslations)
    // Requesting a translation
    // Full URI: http://localhost:port/translation/languages/
    // Required field in request body:
    //      'username': username of the user requesting translation
    //      'text': Text to be translated, 
    //      'source': Language ID to translate from, 
    //      'target': Language ID to translate to
    .post(translationController.createTranslation)

//Get translation records by username
// Required field in request body:
router.route('/username/:username').get(translationController.getTranslationsByUsername);

//Get translation records by id
// Required field in request body:
router.route('/id/:id').get(translationController.getTranslationsByID);

// Getting all supported languages
// Full URI: http://localhost:port/translation/languages/
// Required field in body: 
router.route('/languages').get(translationController.getAllLanguages);

module.exports = router