const Problem = require('../models/Problem');
const asyncHandler = require('express-async-handler')



const getAllProblems = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['CONTESTANT','JUDGE', 'ADMIN'])
    try {
         // Get all users from MongoDB
    const problems = await Problem.find().lean()
     // If no users 
     if (!problems?.length) {
        return res.status(404).json({ message: 'No problems found' })
    }

    res.status(200).json(problems)
    }
    catch (error) {
    console.error('Error in getAllProblems:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    }   
})

// Function to check the user's role
const checkUserRole = asyncHandler(async (req) => {
    try {
        // If the user is found, retrieve the roles from the "roles" array
        const roles = req.headers.roles.map(role => role.toLowerCase());
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

// Function to parse test cases from file
const parseTestCases = async (testFile) => {
    // Read file content and parse
    if (testFile) {
        const testFileContent = testFile.buffer.toString();
        try {
            // File in JSON format
            return JSON.parse(testFileContent);
        } catch (error) {
            // Handle any parsing errors
            throw new Error('Error parsing test file');
        }
    }

    // If no file provided, return an empty array as the default test cases
    return [];
};

// @desc Create a new problem (only for Admin and Judge)
// @route POST /problems
// @access Private
const createProblem = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    try {
        // Check the user's role
        const userRole = await checkUserRole(req);
        if (userRole !== 'Authorized') {
            return res.status(403).json({ error: 'You are not authorized to create a new problem' });
        }
        const { name, description } = req.body;
        const { judgeProgram } = req.body;


        // Check if test cases are provided in a file
        const testFile = req.files?.testFile;
        let testCases;
        if (testFile) {
            // If a file is provided, parse the test cases from the file
            testCases = await parseTestCases(testFile);
        } else {
            // If no file is provided, use the test attribute provided in the request body
            const { test } = req.body;
            testCases = Array.isArray(test) ? test : [];

        }
        const newProblem = new Problem({
            name,
            description,
            test: testCases,
        });
        if (judgeProgram) {
            newProblem.judgeProgram = judgeProgram;
        }
        const savedProblem = await newProblem.save();
        res.status(201).json({message:'New problem created successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Error creating problem' });
    }
});



// @desc Get a specific problem by ID
// @route GET /problems/:problemId
// @access Public
const getProblemById = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['CONTESTANT','JUDGE', 'ADMIN'])
    try {
        const { problemId } = req.params;
        const problem = await Problem.findById(problemId);

        if (!problem) {

            return res.status(404).json({ message: 'Get Problem by ID not found' });
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Error getting problem' });
    }
});

// @desc Update a specific problem by ID (only for Admin and Judge)
// @route PUT /problems/:problemId
// @access Private
const updateProblem = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    try {
        const { id } = req.body;
        const { name, description } = req.body;
        // Check the user's role before allowing the update
        const userRole = await checkUserRole(req);
        if (userRole !== 'Authorized') {
            return res.status(403).json({ error: 'You are not authorized to update this problem' });
        }

        let testCases;

        // Check if test cases are provided in a file
        const testFile = req.files?.testFile;

        if (testFile) {
            // If a file is provided, parse the test cases from the file
            testCases = await parseTestCases(testFile);
        } else {
            // If no file is provided, use the test attribute provided in the request body
            const { test } = req.body;
            testCases = Array.isArray(test) ? test : [];
        }

        const updatedProblem = await Problem.findByIdAndUpdate(
            id,
            { name, description, test: testCases }, // Use the test from the form or file upload
            { new: true }
        );
        if (!updatedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json({message:"Problem updated successfully."});
    } catch (error) {
        res.status(500).json({ error: 'Error updating problem' });
    }
});

// @desc Delete a specific problem by ID (only for Admin and Judge)
// @route DELETE /problems/:problemId
// @access Private
const deleteProblem = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    try {
        const { id } = req.body;

        // Check the user's role before allowing the deletion
        const userRole = await checkUserRole(req);
        if (userRole !== 'Authorized') {
            return res.status(403).json({ error: 'You are not authorized to delete this problem' });
        }

        const deletedProblem = await Problem.findByIdAndDelete(id);
        if (!deletedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting problem' });
    }
});

//Util function
//Get all problems and extract their id
//return a list of problem ID as String
const extractProblemID = async () => {
    const problemIDs = (await Problem.find()).map(problem => problem._id.toString());
    return problemIDs;
}

module.exports = {
    getAllProblems,
    createProblem,
    updateProblem,
    deleteProblem,
    extractProblemID,
};
