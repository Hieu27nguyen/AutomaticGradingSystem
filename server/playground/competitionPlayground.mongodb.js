/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autogradingsystem';
const collection = 'competitions';

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
      uniqueFields = ['_id'];
      let unique = {};
      uniqueFields.map(x => {
          unique[x] = entry[x];
        });

        console.log("Fields that need to be unique" + JSON.stringify(unique));

        if (await db[collection].findOne({ _id: entry._id }) !== null) {
            console.log("Duplicate competition id: " + entry._id);
        } else {
            await db[collection].insertOne(entry);
            console.log("Imported competition: " + entry._id);
        }
    }
};

// Sample data to import
const competitionData = [

    //Test 00
    //Testing duplicate problem id
    {
      _id: 0,
      name: "Event00",
      date: new Date('2023-08-02T00:22:09.247Z'),
      time: '10:09 PM',
      duration: "4 hours",
    },
    {
        _id: 0,
        name: "Event00",
        date: new Date('2023-11-02T00:22:09.247Z'),
        time: '10:09 PM',
        duration: "4 hours",
    }
  ];
  
  // Import problems data
  importData(competitionData);