/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autogradingsystem';
const collection = 'scoreboards';

let bcrypt = require('bcrypt');
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
// let importData = async (data, uniqueFields = [], encryptedFields = []) => { //////
//     for (const entry of data) { // Use "for...of" loop instead of forEach
//         let unique = {};
//         uniqueFields.map(x => {
//             unique[x] = entry[x];
//         });

//         console.log("Fields that need to be unique" + JSON.stringify(unique));

//         if (await db[collection].findOne(unique) !== null) { //////
//             console.log("Duplicate data");
//         } else {
//             let dataToImport = {};
//             for (let key in entry) {
//                 let val = entry[key]; // Declare "val" using "let"

//                 // Encrypt the value first
//                 if (encryptedFields.includes(key)) {
//                     val = await bcrypt.hash(entry[key], 10);
//                     dataToImport[key] = val;
//                     console.log(val);
//                 } else {
//                     dataToImport[key] = val;
//                 }
//             }
//             console.log("Data to be imported " + JSON.stringify(dataToImport));
//             await db[collection].insertOne(dataToImport); ////// 
//         }
//     }
// };

let importData = (data) => {
    data.forEach(async (entry) => {
        await db[collection].insertOne(entry);
        console.log("Imported", entry);
        // console.log()
    });
};

// Sample data to import
const scoreboardData = [
    //Test 00
    //Testing duplicate problem id
    {
      userID: ObjectId("Contestant00"),
      contestID: 0,
      solvedProblem: 1,
      totalScore: 1000,
      submissionDetail:[
        {
            problemID: ObjectId(),
            attemptedTime: 0,
            score: 0,
        },
        {
            problemID: ObjectId(),
            attemptedTime: 10000,
            score: 0,
        },
        {
            problemID: ObjectId(),
            attemptedTime: 10,
            score: 1000,
        }
      ],
    },
    {
        userID: ObjectId("Contestant01"),
        contestID: 0,
        solvedProblem: 3,
        totalScore: 1000,
        submissionDetail:[
          {
              problemID: ObjectId(),
              attemptedTime: 0,
              score: 0,
          },
          {
              problemID: ObjectId(),
              attemptedTime: 10000,
              score: 0,
          },
          {
              problemID: ObjectId(),
              attemptedTime: 10,
              score: 1000,
          }
        ],
      },
      {
        userID: ObjectId("Contestant02"),
        contestID: 0,
        solvedProblem: 2,
        totalScore: 5000,
        submissionDetail:[
          {
              problemID: ObjectId(),
              attemptedTime: 0,
              score: 0,
          },
          {
              problemID: ObjectId(),
              attemptedTime: 10000,
              score: 0,
          },
          {
              problemID: ObjectId(),
              attemptedTime: 50,
              score: 5000,
          }
        ],
      },
      {
        userID: ObjectId("Contestant03"),
        contestID: 0,
        solvedProblem: 2,
        totalScore: 4000,
        submissionDetail:[
          {
              problemID: ObjectId(),
              attemptedTime: 0,
              score: 0,
          },
          {
              problemID: ObjectId(),
              attemptedTime: 10000,
              score: 0,
          },
          {
              problemID: ObjectId(),
              attemptedTime: 40,
              score: 4000,
          }
        ],
      }
    
  ];
  
  // Import problems data
  importData(scoreboardData);

  db[collection].aggregate(
    [
      { $sort : { solvedProblem : -1, totalScore: 1, _id: -1 } }
    ]
 )