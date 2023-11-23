const mongoose = require('mongoose')

const translationSchema = new mongoose.Schema({
    username: {//who requests this translation
        type: String,
        required: true
    },
    languageFrom: {//language would like to translate from
        type: String,
        required: true
    },
    languageTo: {//Language would like to translate to
        type: Boolean,
        default:false,
        required: true
    },
    requestedText:{//Text needed to translate
        type:String,
        required: true,
    },
    translatedText:{//Result of the translation text
        type:String,
        required: true,
    },

})

module.exports = mongoose.model('translations', translationSchema)