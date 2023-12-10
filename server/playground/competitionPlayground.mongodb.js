/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autogradingsystem';
const collection = 'competitions';

// The current database to use.
use(database);

//Test whether collection has existed or not
try {
    database.createCollection(collection);
} catch (exception) {
    console.log("Collection " + collection + " already exists");
}

// Problem Schema: id(given), name, description, judgeProgram, and test.
// Function to insert a new problem into the "problems" collection
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
            console.log("Duplicate competition id, will override: " + JSON.stringify(entry));
            await db[collection].updateOne({ _id: entry._id }, { $set: entry }, { upsert: true });
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported competition: " + JSON.stringify(entry));
        }
        console.log("\n");
    }
};

// Sample data to import
const competitionData = [

    //Test 00
    //Testing duplicate problem id
    {
        _id: ObjectId("65717c949981f01378d7dd1b"),
        name: "Test Competition Long Duration",
        processTimeStart: new Date(Date.now()),
        duration: "10000",
    },

    //Case 2: passed competition
    // {
    //     name: "Test Competition Had Passed",
    //     processTimeStart: new Date("2014-03-01T08:00:00Z"),
    //     duration: "1",
    // },
    //Case 2: Future competition
    // {
    //     name: "Test Competition Not started",
    //     processTimeStart: new Date("2025-12-12T08:00:00Z"),
    //     duration: "1",
    // },
];

// Import problems data
importData(competitionData, ['_id']);