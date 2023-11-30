const User = require('../models/User')
const Scoreboard = require('../models/Scoreboard')
const Problem = require('../models/Problem')
const asyncHandler = require('express-async-handler')
const problemController = require('./problemsController');

const createEmptyRecord = async (username) => {
    let problemStat = [];
    //Initialize the problem stat
    const problemIDs = await problemController.extractProblemID();
    problemIDs.map((probID) => {
        problemStat.push({
            problemID: probID,
            attempts: 0,
            penalty: 0,
            score: 0,
        });
    })

    const newData = {
        username: username,
        totalScore: 0,
        problemSolved: 0,
        problemStatistic: problemStat,
    };

    //Create a new record
    try {
        const newRecord = await Scoreboard.create(newData);
        if (newRecord) {
            return newRecord;//Create susccessfully
        }else{
            
            return null;//Create fail
        }
    }catch (e){
        //Log the error
        console.log(e);
    }

};
const FillRecordForNonSubmittingUsers = async () => {
    //Go ovoer the user contestant list
    const users = await User.find({ roles: { $in: [["CONTESTANT"], "CONTESTANT"] } }).select('-password').lean()


    //Compare the user contestant list to see who does have any submission records
    const scoreboard = await Scoreboard.find();
    //Extract users who already has records
    const usernameWithRecordList = scoreboard.map(scoreboard => scoreboard.username);
    //Extract users with no records
    const noRecordUsers = users.filter((user) => {
        return !usernameWithRecordList.includes(user.username);
    });

  
    const problemIDs = (await Problem.find()).map(problem => problem._id.toString());

    //Adding new records
    noRecordUsers.forEach((user) => createEmptyRecord(user.username));
}





//Getting the competition scoreboard
//Required field in rest's body:
const getScoreboard = asyncHandler(async (req, res) => {
    //Create record for user that does not submit anything
    await FillRecordForNonSubmittingUsers();

    const scoreboard = await Scoreboard.find();

    res.status(200).json(scoreboard);
})

module.exports = {
    getScoreboard,
    createEmptyRecord,

}