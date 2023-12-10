/* global db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const database = 'autogradingsystem';
const collection = 'translations';

use(database);

//Test whether collection has existed or not
// try {
//     database.createCollection(collection);
// } catch (exception) {
//     console.log("Error occurs " + exception.message);
//     console.log("Collection " + collection + " already exists");
// }

// Function to insert a new translation into the "translations" collection
let importData = async (data, uniqueFields = []) => {
    for (const entry of data) { // Use "for...of" loop instead of forEach
        let unique = [];
        uniqueFields.map(x => {
            unique.push({ [x]: entry[x] });
        });

        if (entry["_id"] || !uniqueFields.includes("_id")) {
            unique.push({ "_id": entry["_id"] });
            // unique._id = entry["_id"]; 
        }

        console.log("Fields that need to be unique" + JSON.stringify(unique));
        let duplicatedEntry = await db[collection].findOne({ $or: unique });

        if (duplicatedEntry !== null) {
            console.log("Duplicate translation id: " +  JSON.stringify(entry));
            await db[collection].updateOne({ _id: entry._id }, { $set: entry }, { upsert: true });
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported translation: " + JSON.stringify(entry));
        }
    }
};

// Sample data to import
const translationData = [
    {
        _id: ObjectId("657575242985db81bb62151b"),
        username: "adminTest00",
        languageFrom: "en",
        languageTo: "fr",
        requestedText: "Hello, how are you?",
        translatedText: "Bonjour, comment ça va?",
    },
    {
        _id: ObjectId("657575242985db81bb62151c"),
        username: "team01",
        languageFrom: "es",
        languageTo: "de",
        requestedText: "Hola, ¿cómo estás?",
        translatedText: "Hallo, wie geht es dir?",
    },
];

// Import translation data
importData(translationData, ["_id"]);
