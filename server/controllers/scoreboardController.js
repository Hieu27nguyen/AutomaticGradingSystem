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
            accepted: false,
        });
    })

    const newData = {
        username: username,
        totalScore: 0,
        problemSolved: 0,
        problemStatistic: problemStat,
    };
    let newRecord
    //Create a new record
    try {
        newRecord = await Scoreboard.create(newData);
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


//Return a Sorted version of the scoreboard with ranking
const sortScoreboard = async () =>{
    const scoreboard = await Scoreboard.find().sort({
        problemSolved: -1,//Sort descedning based on problem solved
        totalScore: 1,//Sort ascending based on total score (penalty)
    }).lean();

    let finalScoreboard = []
    let rank = 1;
    for (let i = 0 ; i < scoreboard.length; i++){
        if (i != 0){
            if (scoreboard[i].problemSolved != scoreboard[i - 1].problemSolved || scoreboard[i].totalScore != scoreboard[i - 1].totalScore){
                rank++;
            }
        }
        const data = { 
            rank: rank,
            ...scoreboard[i],
        }
        finalScoreboard.push(data);
    }

    return finalScoreboard;
}

//Getting the competition scoreboard
//Required field in rest's body:
const getScoreboard = asyncHandler(async (req, res) => {
    //Create record for user that does not submit anything
    await FillRecordForNonSubmittingUsers();

    const finalScoreboard = await sortScoreboard();
    res.setHeader('allowedRoles', ['CONTESTANT', 'JUDGE', 'ADMIN'])
    if (finalScoreboard){
        res.status(200).json(finalScoreboard);
    }
    else{
        res.status(500).json({message: "Error when getting scoreboard. Please try again later"});
    }
    
  
})

module.exports = {
    getScoreboard,
    createEmptyRecord,

}