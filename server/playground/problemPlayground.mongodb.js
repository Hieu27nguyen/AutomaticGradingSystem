/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autogradingsystem';
const collection = 'testProblem';

// The current database to use.
use(database);

// Create a new collection.
//db.createCollection(collection);

// Problem Schema: id(given), type, time_limit, and difficulty.
// Function to check if a problem with the given type exists in the "problems" collection
function checkIfProblemExists(name) {
    return db.problems.findOne({ name: name }) !== null;
  }
  
  // Function to insert a new problem into the "problems" collection
  function insertNewProblem(_id, name, description, test) {
    db.problems.insertOne({
      _id,
      name: name,
      description: description,
      test: test
    });
    console.log("\nInput successful for problem of type " + name);
  }
  
  console.log(db.getName());
  console.log("Problems: ");
  let allProblems = db["problems"].find({});
  Object.keys(allProblems).map((value) => {
    console.log(value + " " + allProblems[value]);
  });
  
  // Check problems
  if (!checkIfProblemExists("Problem")) {
    insertNewProblem("1","Problem", "Description", [
        {input: "An input", output: "An output"}
    ]);
  } else {
    console.log("Problem of type " + "Problem" + " already exists\n");
  }