/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autogradingsystem';
const collection = 'testSubmission';

use(database);

// Submission Schema: user, problem, code, status, and timeSubmitted.
// Function to check if a submission with the given user and problem exists in the "submissions" collection
function checkIfSubmissionExists(user, problem) {
  return db.submissions.findOne({ user: user, problem: problem }) !== null;
}

// Function to insert a new submission into the "submissions" collection
function insertNewSubmission(user, problem, code) {
  db.submissions.insertOne({
    user: user,
    problem: problem,
    code: code,
    status: 'Pending',
    timeSubmitted: new Date()
  });
  console.log("\nSubmission successful for user: " + user + " and problem: " + problem +
                "\nSubmitted at: " + timeSubmitted);
}

console.log(db.getName());
console.log("Submissions: ");
let allSubmissions = db["submissions"].find({});
Object.keys(allSubmissions).map((value) => {
  console.log(value + " " + allSubmissions[value]);
});

// Check submissions
const UserId = 'user_id'; 
const ProblemId = 'problem_id'; 

if (!checkIfSubmissionExists(UserId, ProblemId)) {
  insertNewSubmission(UserId, ProblemId, "Code");
} else {
  console.log("Submission for user: " + UserId + " and problem: " + ProblemId + " already exists\n");
}
