/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

//TESTING USING CLIENT IS THE BEST WAY TO TEST SUBMISSION
//SCOREBOARD DOES NOT USE WORK WITH THIS PLAYGROUND
const database = 'autogradingsystem';
const collection = 'submissions';

use(database);

//Test whether collection has existed or not
try {
    database.createCollection(collection);
} catch (exception) {
    console.log("Collection " + collection + " already exists");
}

// Submission Schema: id, user, problem, code, status, and timeSubmitted.
// Function to insert a new submission into the "submission" collection
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
            console.log("Duplicate submission id: " + JSON.stringify(entry));
            await db[collection].updateOne({ _id: entry._id }, { $set: entry }, { upsert: true });
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported submission: " + JSON.stringify(entry));
        }

        console.log("\n");
    }
};

// Import submission data
const submissionsData = [
    {
        _id: ObjectId("6577baad6261457445406941"),
        user: "kokinh11",
        problem: "657547a23bb74cd60d3f4323",
        code: "try:\n    name = input()\n    if name.lower() == \"yes\":\n        print(\"Yes\")\n    else:\n        print(\"No\")\nexcept EOFError as e:\n    print(\"hello world\")",
        status: "Accepted",
        language_id: 71,
        score: 668.15,
        timeSubmitted: "2023-12-12T01:43:09.000Z",
        testResults: [
          {
            stdout: "No\n",
            time: 0.014,
            stderr: null,
            _id: "6577baad6261457445406942"
          },
          {
            stdout: "Yes\n",
            time: 0.014,
            stderr: null,
            _id: "6577baad6261457445406943"
          }
        ]
    },
    {
        _id: ObjectId("6577c9fbc61e36250c4601b3"),
        user: "kokinh12",
        problem: "657547a23bb74cd60d3f4323",
        code: "try:\n    name = input()\n    if name.lower() == \"no\":\n        print(\"Yes\")\n    else:\n        print(\"No\")\nexcept EOFError as e:\n    print(\"hello world\")",
        status: "Accepted",
        language_id: 71,
        score: 668.15,
        timeSubmitted: "2023-12-12T01:43:09.000Z",
        message: "Submission created successfully",
        status: "Wrong Answer",
        testResults: [
          {
            stdout: "No\n",
            time: "0.013",
            stderr: null
          },
          {
            stdout: "No\n",
            time: "0.013",
            stderr: null
          }
        ]
    }
];

// Call the importData function with the sample data
importData(submissionsData, ["_id"]);
