const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const Scoreboard = require('../models/Scoreboard');
const Competition = require('../models/Competition');
const User = require('../models/User')
const asyncHandler = require('express-async-handler');
const submissionRunner = require('../middleware/submissionRunner')
const scoreboardController = require('./scoreboardController')

// Function to check the user's role
// const checkUserRole = asyncHandler(async (req) => {
//     try {
//         const userId = req.userId; // Assuming the user ID is stored in the "userId" property of the request object
//         const user = await User.findById(userId);
//         if (!user) {
//             // If the user is not found
//             return 'Contestant';
//         }
//         // If the user is found, retrieve the roles from the "roles" array
//         const roles = user.roles.toLowerCase();
//         // Check if the user has the "Admin" or "judge" role
//         if (roles.includes('admin') || roles.includes('judge')) {
//             return 'Authorized'; // Return a custom role to represent authorized access
//         }
//         return 'Contestant'; //If the user doesn't have the required roles
//     } catch (error) {
//         // If there is an error fetching
//         return 'Contestant';
//     }
// });

// Function to check the user's role
const checkUserRole = asyncHandler(async (req) => {
    try {
        // If the user is found, retrieve the roles from the "roles" array
        const roles = req.roles.map(role => role.toLowerCase());
        // Check if the user has the "Admin" or "judge" role
        if (roles.includes('admin') || roles.includes('judge')) {
            return 'Authorized'; // Return a custom role to represent authorized access
        }
        else {
            return 'Contestant';
        }
    } catch (error) {
        // If there is an error fetching
        return 'Contestant';
    }
});

//Util function
//Support judging program
const runJudgeProgram = async (judgeCode, userOutput, problemInput) => {

}

//Create a new submission
//Required field in rest's body:
//  user (username: String): username of the contestant that submit
//  problem (problem._id): problem the contestant submit for
//  code (String): the source code 
//  language_id (String): language the submittion is submitted for
//  timeSubmitted (Date): time the problem was submitted
const createSubmission = asyncHandler(async (req, res) => {
    //const { user, problemID, code, languageID } = req.body;
    // // If the code is provided in a file
    // if (req.files?.codeFile) {
    //     code = await parseCodeFromFile(req.files.codeFile);
    // } else if (req.body.code) {
    //     // If the code is provided as a text string
    //     code = req.body.code;
    // }

    //  score: total obtained score calculated based on the time submitted and the contest start time
    //  status: status of the submittion
    let timeSubmitted = req.headers.timesubmitted;//Extract timeSubmitted from headers
    if (!timeSubmitted){
        timeSubmitted = req.headers.timeSubmitted;
        if (!timeSubmitted){
            timeSubmitted = Date.now();
        }
    }
    const { user, problem, code, language_id } = req.body;
    res.setHeader('allowedRoles', ['Contestant'])

    //Check contest start time
    let competitionObj = await Competition.find().lean();
    competitionObj = competitionObj[0];

    if (!competitionObj) {
        return res.status(500).json({ message: 'Competition has not been correctly configured' });
    }

    //Convert the time
    let contestStartTime = competitionObj.processTimeStart.getTime();
    let contestEndTime = contestStartTime + competitionObj.duration * 3600000; //Convert duratio in hour to miliseconds
    let timeSubmittedInMili = new Date(timeSubmitted).getTime();

    if (timeSubmittedInMili < contestStartTime || timeSubmittedInMili > contestEndTime) {
        return res.status(400).json({ message: 'Competition has ended or not yet started' });
    }

    // //Get problem
    const problemObj = await Problem.findById(problem);
    if (!problemObj || !problemObj.test) {
        return res.status(400).json({ message: 'Cannot find problem with the correct ID' });
    }

    //Running the test cases
    let status = "";
    let testProcessed = 0;
    let testPassed = 0;
    let testResults = [];

    const runningJudgeProgram = false;
    //Running each test cases
    await Promise.all(problemObj.test.map(async (test) => {
        const simplifyProblem = {
            stdin: test.input,
            expected_output: test.output,
        };

        let res = await submissionRunner.runSubmission(code, language_id, simplifyProblem).then(
            result => {
                testProcessed++;
                //Test passed, result returns accepted

                //Record detail of the submissions
                testResults.push({
                    stdout: result.stdout,
                    time: result.time,
                    stderr: result.stderr,
                })
                if (!runningJudgeProgram) {
                    if (result.status.id === 3) {
                        testPassed++;
                        return 'accepted';
                    }
                    else if (result.status.id !== 4) {//Encounter compile or runtime error
                        status = result.status.description;
                    }
                }
                else{//Using judge program
                   
                    //  Submission has compile or runtime error
                    if (result.status.id != 3 && result.status.id != 4){
                        status = result.status.description;
                    }
                    else{
                    //  Submisison is runnable
                         //Run judgeProgram here
                    }
                }
            }
        )

        return res;

    }, 0));

    if (status === "") {
        if (testPassed === problemObj.test.length) {
            status = "Accepted";
        }
        else if (testPassed <= problemObj.test.length) {
            status = "Wrong Answer";
        }
    }

    let score = 0

    //Check whether a student has created a submission record or not
    let submissionRecord = await Scoreboard.find({ "username": user });

    if (!submissionRecord || submissionRecord.length == 0) {
        //Create an empty record for the user
        submissionRecord = await scoreboardController.createEmptyRecord(user);
    }

    //Update submission records
    submissionRecord = await Scoreboard.findOne({ "username": user });

    submissionRecord.problemStatistic.map(problemStat => {
        if (problemStat.problemID === problem) {
            problemStat.attempts++;

            if (status !== "Accepted") {
                //Increase the penalty
                if (problemObj.penaltyMinute)
                    problemStat.penalty += problemObj.penaltyMinute;
            } else if (problemStat.accepted != true) {
                score = (timeSubmittedInMili - contestStartTime) / 1000 / 60 + problemStat.penalty;//Calculation based on minutes
                submissionRecord.totalScore += score;
                problemStat.score = score;
                submissionRecord.problemSolved++;
                problemStat.accepted = true;
            }

        }

        return problemStat;
    })
    //Save into the db
    submissionRecord.save();
    //Log result into the database

    let newSubmission = {
        user: user,
        problem: problem,
        code: code,
        language_id: language_id,
        score: score,
        status: status,
        timeSubmitted: timeSubmitted,
        testResults: testResults,
    }

    // Create and store new submission to the db 
    const submission = await Submission.create(newSubmission);

    if (submission) {
        res.status(201).json({ message: 'Submission created successfully', status, testResults });
    } else {
        res.status(400).json({ message: 'Invalid submission data received' });
    }
});

//Getting all the submission
// Required field in rest url:
const getAllSubmissions = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    try {
        // Get all submissions from MongoDB
        const submissions = await Submission.find().lean();

        // If no submissions
        if (!submissions?.length) {
            return res.status(200).json({ message: 'No submissions found' });
        }

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching submissions' });
    }
})


//Getting all the submissions submitted by a user
// Required field in rest url:
//      'username': username of the user requesting translation
const getSubmissionByUsername = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['CONTESTANT', 'JUDGE', 'ADMIN'])
    const user = req.params.username;

    //Get all submission records from MongoDB
    const submissionRecords = await Submission.find({ user }).select().lean()

    // If no records 
    if (!submissionRecords?.length) {
        return res.status(200).json({ message: `No submission records found matching with the username ${user}` })
    }

    res.status(200).json(submissionRecords);

})

//Getting a specific submission by id
// Required field in url param:
//      'id': id of the record
const getSubmissionByID = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['CONTESTANT', 'JUDGE', 'ADMIN'])
    const id = req.params.id;

    //Get the translation record from MongoDB
    const submissionRecords = await Submission.find({ "_id": id })

    // If no records 
    if (!submissionRecords?.length) {
        return res.status(200).json({ message: 'No submission record found matching the id' })
    }

    res.status(200).json(submissionRecords);
})

// // @desc Update a specific submission by ID (only for admins)
// // @route PUT /submissions/:submissionId
// // @access Private (for admins)
// const updateSubmission = asyncHandler(async (req, res) => {
//     try {
//         const { id } = req.body;
//         const { status } = req.body;

//         // // Check the user's role
//         // const userRole = await checkUserRole(req);
//         // if (userRole !== 'Authorized') {
//         //     return res.status(403).json({ error: 'You are not authorized to update a this submission' });
//         // }

//         // Find the submission by ID
//         const submission = await Submission.findById(id);

//         if (!submission) {
//             return res.status(404).json({ message: 'Submission not found' });
//         }

//         // Update the submission's status
//         submission.status = status;

//         const updatedSubmission = await submission.save();

//         res.json({ message: 'Submission updated successfully', data: updatedSubmission });
//     } catch (error) {
//         res.status(500).json({ error: 'Error updating submission' });
//     }
// });

// // @desc Delete a specific submission by ID (only for admins)
// // @route DELETE /submissions/:submissionId
// // @access Private (for admins)
// const deleteSubmission = asyncHandler(async (req, res) => {
//     try {
//         const { id } = req.body;
//         // // Check the user's role
//         // const userRole = await checkUserRole(req);
//         // if (userRole !== 'Authorized') {
//         //     return res.status(403).json({ error: 'You are not authorized to delete this submission' });
//         // }

//         // Find the submission by ID
//         const submission = await Submission.findById(id);

//         if (!submission) {
//             return res.status(404).json({ message: 'Submission not found' });
//         }

//         // Delete the submission
//         await submission.deleteOne();

//         res.json({ message: 'Submission deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error deleting submission' });
//     }
// });

const getSupportedLanguage = (req, res) => {
    res.setHeader('allowedRoles', ['CONTESTANT', 'JUDGE', 'ADMIN'])
    let languages;

    submissionRunner.GET_SUPPORTED_LANGUAGES()
        .then((data) => {
            languages = data;

            res.status(200).json(languages);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error connecting with judging server"
            })
        });
}

module.exports = {
    createSubmission,
    getAllSubmissions,
    getSubmissionByUsername,
    getSubmissionByID,
    // updateSubmission,
    // deleteSubmission,
    getSupportedLanguage,
};
