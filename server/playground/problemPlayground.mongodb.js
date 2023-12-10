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
let importData = async (data, uniqueFields = ["_id"]) => {
    for (const entry of data) { // Use "for...of" loop instead of forEach
        let unique = [];
        uniqueFields.map(x => {
            unique.push({ [x]: entry[x] });
        });

        if (entry["_id"] || !uniqueFields.includes("_id")) {
            unique.push({ "_id": entry["_id"] });
            // unique._id = entry["_id"]; 
        }

        // console.log("Fields that need to be unique" + JSON.stringify(unique));
        let duplicatedEntry = await db[collection].findOne({ $or: unique });

        if (duplicatedEntry !== null) {
            console.log("Duplicate problem, will overide: " + JSON.stringify(entry));
            await db[collection].updateOne({ _id: entry._id }, { $set: entry }, { upsert: true });
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported problem: " + JSON.stringify(entry));
        }
        console.log("\n");
    }
};

// Sample data to import
const problemsData = [

    //Test 00
    //Solution with Python (3.8.1), beware of indent, Added the D
    //text = input()
    //print(text+'d')
    {
        _id: ObjectId("657547a23bb74cd60d3f4322"),
        name: "Added the D",
        description: "Added only 1 letter 'd' to the end of every input",
        judgeProgram: "",
        test: [
            { input: "abc", output: "abcd" },
            { input: "ddd", output: "dddd" },
            { input: "eee", output: "eeed" },
        ],
        memLimit: 128000,
        timeLimit: 2,
        penaltyMinute: 20,
    },

    //Solution for problem 1 with Java Say No
    // import java.util.*;
    // import java.lang.*;
    // import java.io.*;

    // class Ideone
    // {
    // 	public static void main (String[] args) throws java.lang.Exception
    // 	{
    // 		Scanner input = new Scanner(System.in);
    // 		if (input.next().toLowerCase().equals("yes")){
    // 			System.out.print("Yes");
    // 		}
    // 		else{
    // 			System.out.print("No");
    // 		}
    // 	}
    // }
    {
        _id: ObjectId("657547a23bb74cd60d3f4323"),
        name: "Say No",
        description: "Print \"No\", except if the input is yes then say \"Yes\"",
        judgeProgram: "",
        test: [
            { input: "abc", output: "No" },
            { input: "Yes", output: "Yes" }
        ],
        memLimit: 128000,
        timeLimit: 2,
        penaltyMinute: 20,
    },

    // Solution for Problem 2 Add 2 to input
    // import java.util.*;
    // import java.lang.*;
    // import java.io.*;

    // class Ideone
    // {
    // 	public static void main (String[] args) throws java.lang.Exception
    // 	{
    // 		Scanner input = new Scanner(System.in);
    // 		Integer t = input.nextInt();
    // 		System.out.print(t + 2);
    // 	}
    // }
    {
        _id: ObjectId("657547a23bb74cd60d3f4324"),
        name: "Add 2 to input",
        description: "Added 2 to any number in the input",
        judgeProgram: "",
        test: [
            { input: "2", output: "4" },
            { input: "6", output: "8" },
            { input: "12319", output: "12321" }
        ],
        memLimit: 128000,
        timeLimit: 2,
        penaltyMinute: 20,
    },

    //"Empty" problems to test scoreboard, do not use to submit on Client
    {
        _id: ObjectId("6575188b7413221ca2d5998f"),
        name: "Test Scoreboard, DO NOT USE TO SUBMIT",
        description: "Test Scoreboard, DO NOT USE TO SUBMIT",
        judgeProgram: "",
        test: [
            { input: "Hello World", output: "Hello World" },
            { input: "6", output: "6" },
            { input: "12319", output: "12319" }
        ],
        memLimit: 128000,
        timeLimit: 2,
        penaltyMinute: 20,
    },
    {
        _id: ObjectId("657518af48fcae1e2ec7733c"),
        name: "Test Scoreboard, DO NOT USE TO SUBMIT 2",
        description: "Test Scoreboard, DO NOT USE TO SUBMIT 2",
        judgeProgram: "",
        test: [
            { input: "Hello World", output: "Hello World" },
            { input: "6", output: "6" },
            { input: "12319", output: "12319" }
        ],
        memLimit: 128000,
        timeLimit: 2,
        penaltyMinute: 20,
    },

    {

        name: "Test Scoreboard, DO NOT USE TO SUBMIT 3",
        description: "Test Scoreboard, DO NOT USE TO SUBMIT 3",
        judgeProgram: "",
        test: [
            { input: "Hello World", output: "Hello World" },
            { input: "6", output: "6" },
            { input: "12319", output: "12319" }
        ],
        memLimit: 128000,
        timeLimit: 2,
        penaltyMinute: 20,
    },


    // {
    //     _id: ObjectId("Prob2"),
    //     name: "Problem02",
    //     description: "asdsad",
    //     judgeProgram: `
    //         const judgingFunction = (contestantOutput, problemInput = "") => {
    //             let num = parseInt(contestantOutput);
    //             let res = false;
    //             try {
    //                 if (num % 2 === 0) {
    //                     return true;
    //                 }
    //             } catch (error) {
    //                 // If there is an error cannot parse the output
    //                 return false;
    //             }
    //             return res;
    //         };
    //     `
    //     ,
    //     test: [
    //         { input: "2", output: "" },
    //         { input: "4", output: "" }
    //     ],
    // }
];

// Import problems data
importData(problemsData, ["_id"]);
