/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
let bcrypt = require('bcrypt');

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

let importData = async (data, uniqueFields = [], encryptedFields = []) => { //////
    for (const entry of data) { // Use "for...of" loop instead of forEach
        let unique = {};
        uniqueFields.map(x => {
            unique[x] = entry[x];
        });

        console.log("Fields that need to be unique" + JSON.stringify(unique));

        if (await db[collection].findOne(unique) !== null) { //////
            console.log("Duplicate data");
        } else {
            let dataToImport = {};
            for (let key in entry) {
                let val = entry[key]; // Declare "val" using "let"

                // Encrypt the value first
                if (encryptedFields.includes(key)) {
                    val = await bcrypt.hash(entry[key], 10);
                    dataToImport[key] = val;
                    console.log(val);
                } else {
                    dataToImport[key] = val;
                }
            }
            console.log("Data to be imported " + JSON.stringify(dataToImport));
            await db[collection].insertOne(dataToImport); ////// 
        }
    }
};


// Sample data to import
const problemsData = [

    //Test 00
    //Testing duplicate problem id
    {
        name: "Problem00",
        description: "yessir",
        judgeProgram: "",
        test: [{ input: "abc", output: "dfc" }],
    },
    {
        name: "Problem01",
        description: "nosir",
        judgeProgram: "",
        test: [
            { input: "abc", output: "abc" },
            { input: "abcd", output: "dfcg" }
        ],
    },
    {
        name: "Problem02",
        description: "asdsad",
        judgeProgram:
         `
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
        `,
        test: [
            { input: "2", output: "" },
            { input: "4", output: "" }
        ],
    }
];

// Import problems data
importData(problemsData, ["name"]);
