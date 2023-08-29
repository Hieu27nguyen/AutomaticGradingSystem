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
    
    name: "Problem00",
    description: "yessir",
    judgeProgram: [{ input: "abc", output: "dfc" }],
  },
  {
   
    name: "Problem01",
    description: "nosir",
    judgeProgram: [{ input: "adb", output: "adsdv" }],
  }
  // ,
  // //Test 02
  // //Testing duplicate problem name
  // {
  //   _id: "2",
  //   name: "Problem02_1",
  //   description: "yessir",
  //   judgeProgram: [{ input: "abc", output: "dfc" }],
  // },
  // {
  //   _id: "3",
  //   name: "Problem02_2",
  //   description: "nosir",
  //   judgeProgram: [{ input: "adb", output: "adsdv" }],
  // },
  // //Test 03
  // //Testing none input and output
  // {
  //   _id: "4",
  //   name: "Problem03_1",
  //   description: "yessir",
  //   judgeProgram: [],
  // },
  // {
  //   _id: "5",
  //   name: "Problem03_2",
  //   description: "nosir",
  //   judgeProgram: [],
  // },
  // //Test 04
  // //Testing none description
  // {
  //   _id: "6",
  //   name: "Problem04_1",
  //   description: "",
  //   judgeProgram: [{ input: "adb", output: "adsdv" }],
  // },
  // {
  //   _id: "7",
  //   name: "Problem04_2",
  //   description: "",
  //   judgeProgram: [{ input: "adb", output: "adsdv" }],
  // },
  // //Test 05
  // //Testing no output or no input
  // {
  //   _id: "8",
  //   name: "Problem05_1",
  //   description: "yesir",
  //   judgeProgram: [{ input: "adb", output: ""}],
  // },
  // {
  //   _id: "9",
  //   name: "Problem05_2",
  //   description: "nosir",
  //   judgeProgram: [{ input: "", output: "adsdv" }],
  // }
];

// Import problems data
importData(problemsData);