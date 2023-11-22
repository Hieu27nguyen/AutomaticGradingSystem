const express = require('express')
const router = express.Router()
const translationController = require('../controllers/translationController')

router.route('/')
    // .get(translationController.get)
    // Requesting a translation
    // Full URI: http://localhost:port/translation/languages/
    // Required field in request body:
    //      'username': username of the user requesting translation
    //      'text': Text to be translated, 
    //      'source': Language ID to translate from, 
    //      'target': Language ID to translate to
    .post(translationController.createTranslation)

// Getting all supported languages
// Full URI: http://localhost:port/translation/languages/
// Required field in body: 
router.route('/languages').get(translationController.getAllLanguages);


// Insert a new record 
// Full URI: http://localhost:port/cats/
// Required field in body: 'Name', 'Breed', 'Weight', 'Age'


module.exports = router