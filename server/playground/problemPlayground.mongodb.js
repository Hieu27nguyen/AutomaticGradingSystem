/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autogradingsystem';
const collection = 'problems';

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
let importData = async (data) => {
    for (const entry of data) {
        uniqueFields = ['_id', 'name'];
        let unique = {};
        uniqueFields.map(x => {
            unique[x] = entry[x];
        });

        console.log("Fields that need to be unique" + JSON.stringify(unique));

        if (await db[collection].findOne({ _id: entry._id }) !== null) {
            console.log("Duplicate problem: " + entry._id);
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported problem: " + entry._id);
        }
    }
};

// Sample data to import
const problemsData = [

    //Test 00
    //Testing duplicate problem id
    {
        _id: ObjectID("Prob0"),
        name: "Problem00",
        description: "yessir",
        judgeProgram: "",
        test: [{ input: "abc", output: "dfc" }],
    },
    {
        _id: ObjectID("Prob1"),
        name: "Problem01",
        description: "nosir",
        judgeProgram: "",
        test: [
            { input: "abc", output: "abc" },
            { input: "abcd", output: "dfcg" }
        ],
    },
    {
        _id: ObjectID("Prob2"),
        name: "Problem02",
        description: "asdsad",
        judgeProgram: `
            const judgingFunction = (contestantOutput, problemInput = "") => {
                let num = parseInt(contestantOutput);
                let res = false;
                try {
                    if (num % 2 === 0) {
                        return true;
                    }
                } catch (error) {
                    // If there is an error cannot parse the output
                    return false;
                }
                return res;
            };
        `
        ,
        test: [
            { input: "2", output: "" },
            { input: "4", output: "" }
        ],
    }
];

// Import problems data
importData(problemsData);
