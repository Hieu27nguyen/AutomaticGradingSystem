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
    //Solution with Python (3.8.1), beware of indent, Added the D
    //text = input()
    //print(text+'d')
    {
        // _id: ObjectID("Prob0"),
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
        // _id: ObjectID("Prob1"),
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
        // _id: ObjectID("Prob2"),
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

    // {
    //     _id: ObjectID("Prob2"),
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
importData(problemsData);
