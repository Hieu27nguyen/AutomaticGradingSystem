const Translation = require('../models/Translation');
const asyncHandler = require('express-async-handler')

const projectId = 'agstranslate';
const location = 'global';

// Instantiates a client


const axios = require('axios');

// //Getting all languages when the server starts
// const getLanguages = async () => {
//     let result = null;
//     const url = 'https://translation.googleapis.com/language/translate/v2/languages?target=en&model=nmt&key=' + process.env.TRANSLATE_API_KEY;
//     // const url = '' + process.env.TRANSLATE_API_KEY;
//     await axios.get(url).then((data) => {
//         result =  data.data.data.languages;
//         console.log('Supported languages obtained.');

//     }).catch((err) => {
//         console.log('Cannot connect to Google API for translation services');
//     });

//     return result;
// }
// let SUPPORTED_LANGUAGES;
// getLanguages().then((res) => SUPPORTED_LANGUAGES = res);

//Getting all languages supported by Google Cloud API Translation
const getAllLanguages = asyncHandler(async (req, res) => {

    //Implementation to be used when getting the supported language when the server starts
    // //Supported languages not initialized
    // if (!SUPPORTED_LANGUAGES){
    //     res.status(500).json({message: 'Cannot connect to Google API, please try again later.'});
    //     return;
    // }
    // else{
    //     res.json(SUPPORTED_LANGUAGES);
    // }

    //Implementation for fetching the languages every time the request is served
    const getLanguages = () => {
        const url = 'https://translation.googleapis.com/language/translate/v2/languages?target=en&model=nmt&key=' + process.env.TRANSLATE_API_KEY;
        // const url = '' + process.env.TRANSLATE_API_KEY;
        axios.get(url).then((data) => {
            res.status(200).json(data.data.data.languages);

        }).catch((err) => {
            res.status(500).json({ message: 'Cannot connect to Google API, please try again later.' });
        });
    }
    getLanguages();
});

//Getting all the translation requested by all users
const getAllTranslations = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    // const users = await User.find().select('-password').lean()

    // // If no users 
    // if (!users?.length) {
    //     return res.status(400).json({ message: 'No users found' })
    // }

    // res.json(users)
})


// Required field in request body:
//      'username': username of the user requesting translation
//      'text': Text to be translated, 
//      'source': Language ID to translate from, 
//      'target': Language ID to translate to
const createTranslation = asyncHandler(async (req, res) => {
    let { username, text, source, target } = req.body;

    //Make a request to google API to translate
    let translationResult;
    let url = 'https://translation.googleapis.com/language/translate/v2?' +
        'key=' + process.env.TRANSLATE_API_KEY +
        '&source=' + source +
        '&target=' + target +
        '&q=' + text + "" +
        '&model=base'
        ;

    await axios.get(url).then((data) => {
        translationResult = data.data.data.translations[0];


    }).catch((err) => {
        res.status(500).json({ message: 'Cannot connect to Google API to translate, please try again later.' });
    });

    //Add to the database
    res.status(200).json(translationResult);
})

module.exports = {
    getAllLanguages,
    createTranslation,

}