/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autogradingsystem';
const collection = 'testUser';

// The current database to use.
use(database);

// Create a new collection.
//db.createCollection(collection);

// Student Schema: id(given), username, password, and email
// Function to check if name already exists in the testUser collection
function checkIfNameExists(name) {
  return db.testUser.findOne({ name: name }) !== null;
}

// Function to check if email already exists in the testUser collection
function checkIfEmailExists(email) {
  return db.testUser.findOne({ email: email }) !== null;
}

// Function to insert a new student into the testUser collection
function insertNewStudent(name, email, password) {
  db.testUser.insertOne({
    name: name,
    role: "Student",
    email: email,
    password: password
  });
  console.log("Input successful for " + name + " with email " + email + "\n");
}

console.log(db.getName());
console.log("User: ");
let allUser = db["user"].find({});
Object.keys(allUser).map((value) => {
  console.log(value + " " + allUser[value]);
});

// // Fetch names and emails from the database to check
// let usersToCheck = db.testUser.find({}, { _id: 0, name: 1, email: 1, password: 1 }).toArray();

// // Iterate through the fetched users and check
// usersToCheck.forEach((user) => {
//   const { name, email, password } = user;

//   if (!checkIfNameExists(name) && !checkIfEmailExists(email)) {
//     insertNewStudent(name, email, password);
//   } else {
//     console.log("User with name " + name + " and/or email " + email + " already exists");
//   }
// });

if (!checkIfNameExists("studentName") && !checkIfEmailExists("email")) {
  insertNewStudent("studentName", "email", "password");
} else {
  console.log("Student with the name " + "studentName" + " and email " + "email" + " already exists\n");
}

// Problem Schema: id(given), type, time_limit, and difficulty.
// Function to check if a problem with the given type exists in the "problems" collection
function checkIfProblemExists(type) {
  return db.problems.findOne({ type: type }) !== null;
}

// Function to insert a new problem into the "problems" collection
function insertNewProblem(type, timeLimit, difficulty) {
  db.problems.insertOne({
    type: type,
    timeLimit: timeLimit,
    difficulty: difficulty
  });
  console.log("\nInput successful for problem of type " + type);
}

console.log(db.getName());
console.log("Problems: ");
let allProblems = db["problems"].find({});
Object.keys(allProblems).map((value) => {
  console.log(value + " " + allProblems[value]);
});

// Check problems
if (!checkIfProblemExists("Problem")) {
  insertNewProblem("Problem", "Time", "Difficulty");
} else {
  console.log("Problem of type " + "Problem" + " already exists\n");
}


// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/