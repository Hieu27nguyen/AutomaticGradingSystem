const Translation = require('../models/Translation');
const asyncHandler = require('express-async-handler');
const ObjectId = require('mongodb').ObjectId;

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

//Getting all the translation requested by ALL users
// Required field in request body:
const getAllTranslations = asyncHandler(async (req, res) => {
    //Get all translation records from MongoDB
    const translationRecords = await Translation.find().select().lean()

    // If no records 
    if (!translationRecords?.length) {
        return res.status(400).json({ message: 'No translation records found' })
    }

    res.json(translationRecords)
    
})
//  const duplicate = await User.findOne({ username }).lean().exec()

//Getting all the translation requested by a user
// Required field in rest url:
//      'username': username of the user requesting translation
const getTranslationsByUsername = asyncHandler(async (req, res) => {
    const username = req.params.username;
    
    //Get all translation records from MongoDB
    const translationRecords = await Translation.find({username}).select().lean()
    
    // If no records 
    if (!translationRecords?.length) {
        return res.status(200).json({ message: 'No translation records found' })
    }

    res.status(200).json(translationRecords);
    
})

//Getting a specific translation by id
// Required field in rest url:
//      'id': id of the record
const getTranslationsByID = asyncHandler(async (req, res) => {
    const id = req.params.id;
 
    //Get all translation records from MongoDB
    const translationRecords = await Translation.find({"_id": id})
    
    // If no records 
    if (!translationRecords?.length) {
        return res.status(200).json({ message: 'No translation records found' })
    }

    res.status(200).json(translationRecords);
})

// Create a new translation record
// Required field in request body:
//      'username': username of the user requesting translation
//      'text': Text to be translated, 
//      'source': Language ID to translate from, 
//      'target': Language ID to translate to
const createTranslation = asyncHandler(async (req, res) => {
    let { username, text, source, target } = req.body;

    // Confirm data
    if (!username || !text || !source || !target) {
        return res.status(400).json({ message: 'Missing all required fields.' })
    }

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

    //Server cannot reach Google API
    if (!translationResult){
        res.status(500).json({ message: 'Cannot connect to Google API to translate, please try again later.' });
    }

    //Created new translation record
    const translationObject = { 
        username, 
        "languageFrom": source, 
        "languageTo": target, 
        "requestedText": text, 
        "translatedText": translationResult.translatedText,  
    };
    //Add to the database

    // Create and store new translation record 
    const translationRecord = await Translation.create(translationObject)

    if (translationRecord) { //created 
        res.status(201).json({
            message: `New translation record for the user ${username} created`,
            translation: translationResult.translatedText,
    })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }

    // 
    // res.status(200).json(translationResult);
})

module.exports = {
    getAllLanguages,
    getAllTranslations,
    getTranslationsByUsername,
    getTranslationsByID,
    createTranslation,

}