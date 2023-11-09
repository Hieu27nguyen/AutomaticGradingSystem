/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

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
let importData = async (data) => {
  for (const entry of data) {
    let uniqueFields = ['_id'];
    let unique = {};
    uniqueFields.map(x => {
        unique[x] = entry[x];
      });

      console.log("Fields that need to be unique" + JSON.stringify(unique));

      if (await db[collection].findOne({ _id: entry._id }) !== null) {
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
    user: '1', 
    problem: '1', 
    sourcecode: 'console.log("Hello, World!");',
    status: 'Pending',
    score: 0,
    timeSubmitted: new Date('2023-08-02T00:22:09.247Z')
  },
  {
    user: '1', 
    problem: '1', 
    sourcecode: 'print("Hello, World!")',
    status: 'Accepted',
    score: 100,
    timeSubmitted: new Date('2023-08-02T00:22:09.247Z')
  },
  //Test 01
  //Testing allow user to submit mutiple submissions
  {
    user: '1', 
    problem: '3', 
    sourcecode: 'console.log("Hello, World!");',
    status: 'Pending',
    score: 0,
    timeSubmitted: new Date('2023-09-02T04:23:09.247Z')
  },
  {
    user: '1', 
    problem: '2', 
    sourcecode: 'console.log("Hello, World!");',
    status: 'Pending',
    score: 0,
    timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
  },
  //Test 02
  //Testing allow duplicate problem_id
  {
    user: '4', 
    problem: '1', 
    sourcecode: 'console.log("Hello, World!");',
    status: 'Pending',
    score: 0,
    timeSubmitted: new Date('2023-11-02T04:23:09.247Z')
  },
  {
    user: '3', 
    problem: '1', 
    sourcecode: 'console.log("Hello, World!");',
    status: 'Compilation error',
    score: 0,
    timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
  },
  //Test 03
  //Testing allow empty code
  {
    user: '4', 
    problem: '1', 
    sourcecode: '',
    status: 'Failed test',
    score: 0,
    timeSubmitted: new Date('2023-11-02T04:23:09.247Z')
  },
  {
    user: '3', 
    problem: '1', 
    sourcecode: '',
    status: 'Runtime error',
    score: 20,
    timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
  },
  //Test 04
  //Testing negative score
  {
    user: '4', 
    problem: '1', 
    sourcecode: 'console.log("Hello, World!");',
    status: 'Accepted',
    score: -10,
    timeSubmitted: new Date('2022-11-02T04:05:09.247Z')
  },
  {
    user: '3', 
    problem: '1', 
    sourcecode: 'console.log("Hello, World!");',
    status: 'Pending',
    score: -99,
    timeSubmitted: new Date('2021-01-01T02:02:09.247Z')
  }
];

// Call the importData function with the sample data
importData(submissionsData);
