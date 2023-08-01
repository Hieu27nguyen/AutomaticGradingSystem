const Problem = require('../models/Problem'); 
const asyncHandler = require('express-async-handler')
const multer = require('multer');
const upload = multer(); // Set up multer for file uploads

// Function to check the user's role
const checkUserRole = async (req) => {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the "userId" property of the request object
      const user = await user.findById(userId);
      if (!user) {
        // If the user is not found
        return 'Contestant';
      }
      // If the user is found, retrieve the roles from the "roles" array
      const roles = user.roles;
      // Check if the user has the "Admin" or "judge" role
      if (roles.includes('Admin') || roles.includes('judge')) {
        return 'Authorized'; // Return a custom role to represent authorized access
      }
      return 'Contestant'; //If the user doesn't have the required roles
    } catch (error) {
      // If there is an error fetching
      return 'Contestant';
    }
  };

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
    try {
      // Check the user's role
      const userRole = await checkUserRole(req);
      if (userRole !== 'Authorized') {
        return res.status(403).json({ error: 'You are not authorized to create a new problem' });
      }
  
      const {_id, name, description } = req.body;
      const testCases = await parseTestCases(req.files?.testFile);
  
      const newProblem = new Problem({
        _id,
        name,
        description,
        test: testCases,
      });
      const savedProblem = await newProblem.save();
      res.status(201).json(savedProblem);
    } catch (error) {
      res.status(500).json({ error: 'Error creating problem' });
    }
  });

  // @desc Get a specific problem by ID
  // @route GET /problems/:problemId
  // @access Public
  const getProblemById = asyncHandler(async (req, res) => {
    try {
      const { problemId } = req.params;
      const problem = await Problem.findById(problemId);
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
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
  try {
    const { problemId } = req.params;
    const { name, description } = req.body;

    // Check the user's role before allowing the update
    const userRole = await checkUserRole(req);
    if (userRole !== 'Authorized') {
      return res.status(403).json({ error: 'You are not authorized to update this problem' });
    }

    const testCases = await parseTestCases(req.files?.testFile); // Use the utility function

    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      { name, description, test: testCases }, // Use the test from the form or file upload
      { new: true }
    );
    if (!updatedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(updatedProblem);
  } catch (error) {
    res.status(500).json({ error: 'Error updating problem' });
  }
});
  
  // @desc Delete a specific problem by ID (only for Admin and Judge)
  // @route DELETE /problems/:problemId
  // @access Private
  const deleteProblem = asyncHandler(async (req, res) => {
    try {
      const { problemId } = req.params;
  
      // Check the user's role before allowing the deletion
      const userRole = await checkUserRole(req);
      if (userRole !== 'Authorized') {
        return res.status(403).json({ error: 'You are not authorized to delete this problem' });
      }
  
      const deletedProblem = await Problem.findByIdAndDelete(problemId);
      if (!deletedProblem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
      res.json({ message: 'Problem deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting problem' });
    }
  });
  
  module.exports = {
    createProblem,
    getProblemById,
    updateProblem,
    deleteProblem
  };
  