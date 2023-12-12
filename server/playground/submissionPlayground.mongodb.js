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
// Function to insert a new submission into the "submissions" collection
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
            console.log("Duplicate problem: " + entry._id);
        } else {
            if (entry.score < 0) {
                console.log("Negative Score: " + entry.score);
            } else {
                await db[collection].insertOne(entry);
                console.log("Imported problem: " + entry._id);
            }
        }
    }
};

// Import submission data
const submissionsData = [

    //Test 00
    //Testing duplicate submission id
    {
        _id: "1",
        user: 'team01',
        problem: '1',
        sourcecode: 'console.log("Hello, World!");',
        status: 'Pending',
        score: 0,
        timeSubmitted: new Date('2023-08-02T00:22:09.247Z')
    },
    {
        _id: "1",
        user: 'team01',
        problem: '1',
        sourcecode: 'print("Hello, World!")',
        status: 'Accepted',
        score: 100,
        timeSubmitted: new Date('2023-08-02T00:22:09.247Z')
    },
    //Test 01
    //Testing allow user to submit mutiple submissions
    {
        _id: "2",
        user: 'team01',
        problem: '3',
        sourcecode: 'console.log("Hello, World!");',
        status: 'Pending',
        score: 0,
        timeSubmitted: new Date('2023-09-02T04:23:09.247Z')
    },
    {
        _id: "3",
        user: 'team01',
        problem: '2',
        sourcecode: 'console.log("Hello, World!");',
        status: 'Pending',
        score: 0,
        timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
    },
    //Test 02
    //Testing allow duplicate problem_id
    {
        _id: "4",
        user: 'team01',
        problem: '1',
        sourcecode: 'console.log("Hello, World!");',
        status: 'Pending',
        score: 0,
        timeSubmitted: new Date('2023-11-02T04:23:09.247Z')
    },
    {
        _id: "4",
        user: 'team01',
        problem: '1',
        sourcecode: 'console.log("Hello, World!");',
        status: 'Compilation error',
        score: 0,
        timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
    },
    //Test 03
    //Testing allow empty code
    {
        _id: "5",
        user: 'team01',
        problem: '1',
        sourcecode: '',
        status: 'Failed test',
        score: 0,
        timeSubmitted: new Date('2023-11-02T04:23:09.247Z')
    },
    {
        _id: "6",
        user: 'team01',
        problem: '1',
        sourcecode: '',
        status: 'Runtime error',
        score: 20,
        timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
    },
    //Test 04
    //Testing negative score
    {
        _id: "7",
        user: 'team01',
        problem: '1',
        sourcecode: 'console.log("Hello, World!");',
        status: 'Accepted',
        score: -10,
        timeSubmitted: new Date('2022-11-02T04:05:09.247Z')
    },
    {
        _id: "8",
        user: 'team01',
        problem: '1',
        sourcecode: 'console.log("Hello, World!");',
        status: 'Pending',
        score: -99,
        timeSubmitted: new Date('2021-01-01T02:02:09.247Z')
    }
];

// Call the importData function with the sample data
importData(submissionsData);
