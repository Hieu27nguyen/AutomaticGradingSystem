const Submission = require('../models/Submission');
const asyncHandler = require('express-async-handler');

// Function to check the user's role
const checkUserRole = asyncHandler(async (req) => {
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
  });

// Function to parse code from file
const parseCodeFromFile = async (codeFile) => {
    // Read its content and return the code
    if (codeFile) {
      const codeFileContent = codeFile.buffer.toString();
      return codeFileContent;
    }
  
    // If no file provided, return an empty string
    return '';
  };

// @desc Create a new submission
// @route POST /submissions
// @access Public
const createSubmission = asyncHandler(async (req, res) => {
    try {
        const { user, problem } = req.body;
        // If the code is provided in a file
        if (req.files?.codeFile) {
            code = await parseCodeFromFile(req.files.codeFile);
        } else if (req.body.code) {
            // If the code is provided as a text string
            code = req.body.code;
        }
        const status = 'Pending'; // Set the default status
    
        // Create and store new submission 
        const submission = await Submission.create({ user, problem, code, status });
    
        if (submission) {
          res.status(201).json({ message: 'Submission created successfully', data: submission });
        } else {
          res.status(400).json({ message: 'Invalid submission data received' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error creating submission' });
      }
    });
    
// @desc Get a specific submission by ID
// @route GET /submissions/:submissionId
// @access Public
const getSubmissionById = asyncHandler(async (req, res) => {
  const { submissionId } = req.params;

  try {
    const submission = await Submission.findById(submissionId).populate('user').populate('problem');
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching submission' });
  }
});

// @desc Update a specific submission by ID (only for admins)
// @route PUT /submissions/:submissionId
// @access Private (for admins)
const updateSubmission = asyncHandler(async (req, res) => {
    try {
      const { submissionId } = req.params;
      const { status } = req.body;
  
    // Check the user's role
    const userRole = await checkUserRole(req);
      if (userRole !== 'Authorized') {
        return res.status(403).json({ error: 'You are not authorized to update a this submission' });
      }
  
      // Find the submission by ID
      const submission = await Submission.findById(submissionId);
  
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
  
      // Update the submission's status
      submission.status = status;
  
      const updatedSubmission = await submission.save();
  
      res.json({ message: 'Submission updated successfully', data: updatedSubmission });
    } catch (error) {
      res.status(500).json({ error: 'Error updating submission' });
    }
  });
  
  // @desc Delete a specific submission by ID (only for admins)
  // @route DELETE /submissions/:submissionId
  // @access Private (for admins)
  const deleteSubmission = asyncHandler(async (req, res) => {
    try {
      const { submissionId } = req.params;
  
    // Check the user's role
    const userRole = await checkUserRole(req);
      if (userRole !== 'Authorized') {
        return res.status(403).json({ error: 'You are not authorized to delete this submission' });
      }
  
      // Find the submission by ID
      const submission = await Submission.findById(submissionId);
  
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
  
      // Delete the submission
      await submission.delete();
  
      res.json({ message: 'Submission deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting submission' });
    }
  });

module.exports = {
  createSubmission,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
};
