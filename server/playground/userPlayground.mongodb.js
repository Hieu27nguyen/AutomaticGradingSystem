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
        let unique = [];
        uniqueFields.map(x => {
            unique.push({ [x]: entry[x] });
        });

        if (entry["_id"] || !uniqueFields.includes("_id")) {
            unique.push({ "_id": entry["_id"] });
            // unique._id = entry["_id"]; 
        }

        let dataToImport = {};
        for (let key in entry) {
            let val = entry[key]; // Declare "val" using "let"

            // Encrypt the value first
            if (encryptedFields.includes(key)) {
                val = await bcrypt.hash(entry[key], 10);
                dataToImport[key] = val;
            } else {
                dataToImport[key] = val;
            }
        }

        // console.log("Fields that need to be unique" + JSON.stringify(unique));
        let duplicatedEntry = await db[collection].findOne({ $or: unique });
    
        if (duplicatedEntry) { //////
            console.log("Duplicate user spotted, user with the id will be overrided", duplicatedEntry._id.toString());
            await db[collection].updateOne({ _id: entry._id }, { $set: dataToImport }, { upsert: true });
        } else {

            // console.log("Data to be imported " + JSON.stringify(dataToImport));
            await db[collection].insertOne(dataToImport); ////// 
        }
        console.log("\n");
    }
};

let data = [

    //Test 00
    {
        _id: ObjectId("657542785d6447152b3809db"),
        username: "adminTest00",
        password: "123",
        roles: ["ADMIN"],
    },
    //Test 01
    //Testing insertion with different roles
    {
        _id: ObjectId("657542785d6447152b3809dd"),
        username: "adminTest01",
        password: "123",
        roles: ["ADMIN"],
    },
    {
        _id: ObjectId("657542785d6447152b3809de"),
        username: "judgeTest01",
        password: "123",
        roles: ["JUDGE"],
    },
    {
        //Test 02
        //Testing mutiple assigned roles
        username: "adminTest02",
        _id: ObjectId("657542785d6447152b3809df"),
        password: "123",
        roles: ["ADMIN, JUDGE"],
    },
    {
        username: "judgeTest02",
        _id: ObjectId("657542785d6447152b3809e0"),
        password: "123",
        roles: ["ADMIN, JUDGE, CONTESTANT"],
    },
    {
        //Test 03
        //Testing duplicate password
        _id: ObjectId("657542785d6447152b3809e1"),
        username: "adminTest03",
        password: "123",
        roles: ["ADMIN"],
    },
    {
        _id: ObjectId("657542785d6447152b3809e2"),
        username: "judgeTest03",
        password: "talaaai123",
        roles: ["JUDGE"],
    },
    //Test contestants
    {
        _id: ObjectId("657542785d6447152b3809e3"),
        username: "team01",
        password: "123",
        roles: ["CONTESTANT"],
    },
    {
        _id: ObjectId("657542785d6447152b3809e4"),
        username: "team02",
        password: "123",
        roles: ["CONTESTANT"],
    },
    {
        _id: ObjectId("657541c01cbcfc5c1577e446"),
        username: "team03",
        password: "123",
        roles: ["CONTESTANT"],
    },
    {
        _id: ObjectId("657542785d6447152b3809e5"),
        username: "team04",
        password: "123",
        roles: ["CONTESTANT"],
    },
    {
        _id: ObjectId("657542785d6447152b3809dc"),
        username: "team05",
        password: "123",
        roles: ["CONTESTANT"],
    },
    {
        _id: ObjectId("657542785d6447152b2809dc"),
        username: "team05",
        password: "123",
        roles: ["CONTESTANT"],
    },
    {
        _id: ObjectId("657542785d6447152b3709dc"),
        username: "koinh12",
        password: "123",
        roles: ["CONTESTANT"],
    },
];

importData(data, ["username"], ["password"]);