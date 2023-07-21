/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autogradingsystem';
const collection = 'testUser';

// The current database to use.
use(database);

// Create a new collection.
//db.createCollection(collection);

console.log(db.getName());
console.log("User: ");
let allUser = db["user"].find({});
Object.keys(allUser).map((value) => {
  console.log(value + " " + allUser[value]);
});
if (!db.testUser.findOne({ name: "name" })) {
  db.testUser.insertOne(
    { name: "name", role: "Student" }
  )
  console.log("\nInput successful");
}
else{
  console.log("Already has user with the existing name");
}

//db.createCollection("testUser");
let allTestUser = db.testUser.findOne({});
console.log(db.testUser.getName());

console.log(JSON.stringify(allTestUser));

Object.keys(allTestUser).map((value) => {
  console.log(value + " " + allTestUser[value]);
});
// allTestUser.map((x) =>{
//   console.log(x);
// });
// db.collection.insertOne(
//   { name: "name", role: "Student" }
// )






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
