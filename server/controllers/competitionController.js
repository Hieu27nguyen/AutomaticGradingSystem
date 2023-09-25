const Competition = require('../models/Competition');
const asyncHandler = require('express-async-handler');


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

// Create a new competition
const createCompetition = asyncHandler(async (req, res) => {
    // Check the user's role
    const userRole = await checkUserRole(req);
    if (userRole !== 'Authorized') {
      return res.status(403).json({ error: 'You are not authorized to create a new competition' });
    }
  
    const { _id, name, startDateTime, duration } = req.body;
  
    const newCompetition = new Competition({
      _id,
      name,
      startDateTime,
      duration,
    });
  
    try {
      const savedCompetition = await newCompetition.save();
      res.status(201).json(savedCompetition);
    } catch (error) {
      res.status(500).json({ error: 'Error creating competition' });
    }
  });

// Get all competitions
const getAllCompetitions = asyncHandler(async (req, res) => {
  try {
    const competitions = await Competition.find().lean();
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching competitions' });
  }
});

// Update a specific competition by ID
const updateCompetition = asyncHandler(async (req, res) => {
    const { competitionId } = req.params;
    const { name, startDateTime, duration } = req.body;
  
    // Check the user's role
    const userRole = await checkUserRole(req);
    if (userRole !== 'Authorized') {
      return res.status(403).json({ error: 'You are not authorized to update this competition' });
    }
  
    try {
      const updatedCompetition = await Competition.findByIdAndUpdate(
        competitionId,
        { name, startDateTime, duration },
        { new: true }
      );
  
      if (!updatedCompetition) {
        return res.status(404).json({ message: 'Competition not found' });
      }
  
      res.json(updatedCompetition);
    } catch (error) {
      res.status(500).json({ error: 'Error updating competition' });
    }
  });

// Delete a specific competition by ID
const deleteCompetition = asyncHandler(async (req, res) => {
    const { competitionId } = req.params;
  
    // Check the user's role
    const userRole = await checkUserRole(req);
    if (userRole !== 'Authorized') {
      return res.status(403).json({ error: 'You are not authorized to delete this competition' });
    }
  
    try {
      const deletedCompetition = await Competition.findByIdAndDelete(competitionId);
      if (!deletedCompetition) {
        return res.status(404).json({ message: 'Competition not found' });
      }
      res.json({ message: 'Competition deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting competition' });
    }
  });

module.exports = {
  createCompetition,
  getAllCompetitions,
  updateCompetition,
  deleteCompetition,
};
