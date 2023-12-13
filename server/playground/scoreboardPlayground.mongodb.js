/* global db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
const database = 'autogradingsystem';
const collection = 'scoreboards';

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
            console.log("Duplicate scoreboard id: " + JSON.stringify(entry));
            await db[collection].updateOne({ _id: entry._id }, { $set: entry }, { upsert: true });
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported scoreboard: " + JSON.stringify(entry));
        }

        console.log("\n");
    }
};

// Sample data to import
const scoreboardData = [
    {
        _id: ObjectId("657654be7c9b002f8ef8a74c"),
        username: "team03",
        problemSolved: 2,
        totalScore: 100,
        problemStatistic: [
            {
                problemID: "657547a23bb74cd60d3f4322",//Add the D
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4323",//Say No
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4324",//Add 2 to input
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "6575188b7413221ca2d5998f",//Test Problem 1
                attempts: 1,
                penalty: 0,
                score: 0,
                accepted: true
            },
            {
                problemID: "657518af48fcae1e2ec7733c",//Test Problem 2
                attempts: 2,
                penalty: 80,
                score: 100,
                accepted: true
            },
            {
                problemID: "657576dc8b34e161d229059a",// Test Problem 3
                attempts: 5,
                penalty: 200,
                score: 0,
                accepted: false
            },
        ],
    },
    {
        _id: ObjectId("657654be7c9b002f8ef8a710"),
        username: "team01",
        problemSolved: 2,
        totalScore: 120,
        problemStatistic: [
            {
                problemID: "657547a23bb74cd60d3f4322",//Add the D
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4323",//Say No
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4324",//Add 2 to input
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "6575188b7413221ca2d5998f",//Test Problem 1
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657518af48fcae1e2ec7733c",//Test Problem 2
                attempts: 1,
                penalty: 0,
                score: 0,
                accepted: true
            },
            {
                problemID: "657576dc8b34e161d229059a",// Test Problem 3
                attempts: 1,
                penalty: 0,
                score: 120,
                accepted: true
            },
        ],
    },
    {
        _id: ObjectId("657654be7c9b002f8ef8a76a"),
        username: "team04",
        problemSolved: 3,
        totalScore: 1000,
        problemStatistic: [
            {
                problemID: "657547a23bb74cd60d3f4322",//Add the D
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4323",//Say No
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4324",//Add 2 to input
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "6575188b7413221ca2d5998f",//Test Problem 1
                attempts: 1,
                penalty: 0,
                score: 500,
                accepted: true
            },
            {
                problemID: "657518af48fcae1e2ec7733c",//Test Problem 2
                attempts: 1,
                penalty: 0,
                score: 100,
                accepted: true
            },
            {
                problemID: "657576dc8b34e161d229059a",// Test Problem 3
                attempts: 11,
                penalty: 200,
                score: 400,
                accepted: true
            },
        ],
    },
    {
        _id: ObjectId("657654be7c9b002f8ef8a72e"),
        username: "team02",
        problemSolved: 1,
        totalScore: 300,
        problemStatistic: [
            {
                problemID: "657547a23bb74cd60d3f4322",//Add the D
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4323",//Say No
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4324",//Add 2 to input
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "6575188b7413221ca2d5998f",//Test Problem 1
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657518af48fcae1e2ec7733c",//Test Problem 2
                attempts: 1,
                penalty: 0,
                score: 300,
                accepted: true
            },
            {
                problemID: "657576dc8b34e161d229059a",// Test Problem 3
                attempts: 12,
                penalty: 240,
                score: 0,
                accepted: false
            },
        ],
    },
    {
        _id: ObjectId("6577ba63626145744540689c"),
        username: "kokinh11",
        problemSolved: 1,
        totalScore: 668.15,
        problemStatistic: [
            {
                problemID: "657547a23bb74cd60d3f4322",//Add the D
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4323",//Say No
                attempts: 0,
                penalty: 0,
                score: 668.15,
                accepted: true
            },
            {
                problemID: "657547a23bb74cd60d3f4324",//Add 2 to input
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "6575188b7413221ca2d5998f",//Test Problem 1
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657518af48fcae1e2ec7733c",//Test Problem 2
                attempts: 1,
                penalty: 0,
                score: 300,
                accepted: true
            },
            {
                problemID: "657576dc8b34e161d229059a",// Test Problem 3
                attempts: 12,
                penalty: 240,
                score: 0,
                accepted: false
            },
        ],
    },
    {
        _id: ObjectId("65778f284ab6ef4abd3506df"),
        username: "kokinh12",
        problemSolved: 1,
        totalScore: 668.15,
        problemStatistic: [
            {
                problemID: "657547a23bb74cd60d3f4322",//Add the D
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4323",//Say No
                attempts: 1,
                penalty: 20,
                score: 0,
                accepted: false
            },
            {
                problemID: "657547a23bb74cd60d3f4324",//Add 2 to input
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "6575188b7413221ca2d5998f",//Test Problem 1
                attempts: 0,
                penalty: 0,
                score: 0,
                accepted: false
            },
            {
                problemID: "657518af48fcae1e2ec7733c",//Test Problem 2
                attempts: 1,
                penalty: 0,
                score: 300,
                accepted: true
            },
            {
                problemID: "657576dc8b34e161d229059a",// Test Problem 3
                attempts: 12,
                penalty: 240,
                score: 0,
                accepted: false
            },
        ],
    }
];

// Import translation data
importData(scoreboardData, ["_id"]);
