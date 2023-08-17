const database = 'autogradingsystem';
const collection = 'users';

let bcrypt = require('bcrypt');
// The current database to use.
use(database);

//Test whether collection has existed or not
try {
    database.createCollection(collection);
} catch (exception) {
    console.log("Collection " + collection + " already exists");
}

let importData = async (data, uniqueFields = [], encryptedFields = []) => { //////
    for (const entry of data) { // Use "for...of" loop instead of forEach
        let unique = {};
        uniqueFields.map(x => {
            unique[x] = entry[x];
        });

        console.log("Fields that need to be unique" + JSON.stringify(unique));

        if (await db[collection].findOne(unique) !== null) { //////
            console.log("Duplicate data");
        } else {
            let dataToImport = {};
            for (let key in entry) {
                let val = entry[key]; // Declare "val" using "let"

                // Encrypt the value first
                if (encryptedFields.includes(key)) {
                    val = await bcrypt.hash(entry[key], 10);
                    dataToImport[key] = val;
                    console.log(val);
                } else {
                    dataToImport[key] = val;
                }
            }
            console.log("Data to be imported " + JSON.stringify(dataToImport));
            await db[collection].insertOne(dataToImport); ////// 
        }
    }
};

let data = [

  //Test 00
  //Testing duplicate username
  {
    username: "adminTest00",
    password: "abc123A",
    online: false,
    roles: "ADMIN",
  },
  {
    username: "adminTest00",
    password: "abcd1234",
    online: false,
    roles: "JUDGE",
  },
  //Test 01
  //Testing insertion with different roles
  {
    username: "adminTest01",
    password: "123",
    online: true,
    roles: "ADMIN",
  },
  {
    username: "judgeTest01",
    password: "abc",
    online: true,
    roles: "judge",
  },
  {
  //Test 02
  //Testing mutiple assigned roles
    username: "adminTest02",
    password: "talaaai123",
    online: false,
    roles: ["ADMIN, JUDGE"],
  },
  {
    username: "judgeTest02",
    password: "talaai123",
    online: false,
    roles: ["ADMIN, JUDGE, CONTESTANT"],
  },
  {
  //Test 03
  //Testing duplicate password
    username: "adminTest03",
    password: "123",
    online: false,
    roles: "adMIN",
  },
  {
    username: "judgeTest03",
    password: "talaaai123",
    online: false,
    roles: "JUDGE",
  },
  //Test contestants
  {
    username: "contestantTest00",
    password: "123",
    online: false,
    roles: "Contestant",
  },
  {
    username: "contestantTest01",
    password: "123",
    online: false,
    roles: "Contestant",
  },
  {
    username: "contestantTest02",
    password: "123",
    online: false,
    roles: "Contestant",
  },
];

importData(data, ["username"], ["password"]);