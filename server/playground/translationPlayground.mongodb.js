/* global db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const database = 'autogradingsystem';
const collection = 'translations';

use(database);

//Test whether collection has existed or not
try {
    database.createCollection(collection);
} catch (exception) {
    console.log("Collection " + collection + " already exists");
}

// Function to insert a new translation into the "translations" collection
let importData = async (data) => {
    for (const entry of data) {
        uniqueFields = ['_id'];
        let unique = {};
        uniqueFields.map(x => {
            unique[x] = entry[x];
        });

        console.log("Fields that need to be unique" + JSON.stringify(unique));

        if (await db[collection].findOne({ _id: entry._id }) !== null) {
            console.log("Duplicate translation id: " + entry._id);
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported translation: " + entry._id);
        }
    }
};

// Sample data to import
const translationData = [
    {
        username: "kokinh11",
        languageFrom: "en",
        languageTo: "fr",
        requestedText: "Hello, how are you?",
        translatedText: "Bonjour, comment ça va?",
    },
    {
        username: "kokinh12",
        languageFrom: "es",
        languageTo: "de",
        requestedText: "Hola, ¿cómo estás?",
        translatedText: "Hallo, wie geht es dir?",
    },
];

// Import translation data
importData(translationData);
