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
    uniqueFields = ['_id'];
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

// Import submission data
const submissionsData = [

  //Test 00
  //Testing duplicate submission id
  {
    _id: "1",
    user: '1', 
    problem: '1', 
    code: 'console.log("Hello, World!");',
    status: 'Pending',
    timeSubmitted: new Date('2023-08-02T00:22:09.247Z')
  },
  {
    _id: "1",
    user: '1', 
    problem: '1', 
    code: 'print("Hello, World!")',
    status: 'Accepted',
    timeSubmitted: new Date('2023-08-02T00:22:09.247Z')
  },
  //Test 01
  //Testing allow user to submit mutiple submissions
  {
    _id: "2",
    user: '1', 
    problem: '3', 
    code: 'console.log("Hello, World!");',
    status: 'Pending',
    timeSubmitted: new Date('2023-09-02T04:23:09.247Z')
  },
  {
    _id: "3",
    user: '1', 
    problem: '2', 
    code: 'console.log("Hello, World!");',
    status: 'Pending',
    timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
  },
  //Test 02
  //Testing allow duplicate problem_id
  {
    _id: "4",
    user: '4', 
    problem: '1', 
    code: 'console.log("Hello, World!");',
    status: 'Pending',
    timeSubmitted: new Date('2023-11-02T04:23:09.247Z')
  },
  {
    _id: "5",
    user: '3', 
    problem: '1', 
    code: 'console.log("Hello, World!");',
    status: 'Pending',
    timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
  },
  //Test 03
  //Testing allow empty code
  {
    _id: "6",
    user: '4', 
    problem: '1', 
    code: '',
    status: 'Pending',
    timeSubmitted: new Date('2023-11-02T04:23:09.247Z')
  },
  {
    _id: "7",
    user: '3', 
    problem: '1', 
    code: '',
    status: 'Pending',
    timeSubmitted: new Date('2023-01-01T02:22:09.247Z')
  },
];

// Call the importData function with the sample data
importData(submissionsData);
