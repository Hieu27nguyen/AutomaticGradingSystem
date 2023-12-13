/* global db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const database = 'autogradingsystem';
const collection = 'announcements';

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
            console.log("Duplicate announcement id: " + JSON.stringify(entry));
            await db[collection].updateOne({ _id: entry._id }, { $set: entry }, { upsert: true });
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported announcement: " + JSON.stringify(entry));
        }
    }
};

const announcementsData = [{
    "_id":
        "657916950db3bf7afd007290",
    "username": "adminTest01",
    "title": "This is an announcement!",
    "announceInformation": "I announce to the whole competitors here that I have announced an announcement.",
    "announcementTime": "2023-12-13T02:27:33.999Z",
},
{
    "_id": "6579171f0db3bf7afd0072d6",
    "username": "adminTest01",
    "title": "Another day, another announcement.",
    "announceInformation": "Hello, is this thing on?",
    "announcementTime": "2023-12-13T02:29:51.929Z",

}]

importData(announcementsData, ["_id"]);