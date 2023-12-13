const Competition = require('../models/Competition');
const asyncHandler = require('express-async-handler');

const checkUserRole = asyncHandler(async (req) => {
    try {
        // If the user is found, retrieve the roles from the "roles" array
        const roles = req.headers.roles.map(roles => roles.toLowerCase());
        // Check if the user has the "Admin" or "judge" role
        if (roles.includes('admin') || roles.includes('judge')) {
            return 'Authorized'; // Return a custom role to represent authorized access
        } else {
            return 'Contestant'; //If the user doesn't have the required roles
        }
    } catch (error) {
        // If there is an error fetching
        return 'Contestant';
    }
});

// Create a new competition
const createCompetition = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    // Check the user's role
    const userRole = await checkUserRole(req);
    if (userRole !== 'Authorized') {
        return res.status(403).json({ error: 'You are not authorized to create or modify a new competition' });
    }

    const { name, duration, processTimeStart } = req.body;

    const newCompetition = await Competition.create({
        name,
        "processTimeStart": processTimeStart,
        duration,
    })
   

    if (newCompetition) { //created 
        res.status(201).json({ message: `New contest created` })
    } else {
        res.status(400).json({ message: 'Invalid contest data received' })
    }
});

// Get all competitions
const getAllCompetitions = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    try {
        const competitions = await Competition.find().lean();
        if (!competitions?.length) {
            res.status(404).json({message:"No competition hosted yet"})
        }
        res.status(200).json(competitions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching competitions' });
    }
});

// Update a specific competition
// Update the first element in the database
const updateCompetition = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    const { name, duration, processTimeStart } = req.body;
    // Check the user's role

    const userRole = await checkUserRole(req);
    if (userRole !== 'Authorized') {
        return res.status(403).json({ error: 'You are not authorized to update this competition' });
    }
   
    try {
        const firstCompetition = await Competition.findOne();

        if (!firstCompetition) {
            return res.status(404).json({ message: 'Competition not found' });
        }

        firstCompetition.name = name;
        firstCompetition.processTimeStart = processTimeStart;
        firstCompetition.duration = duration;
        const updatedCompetition = await firstCompetition.save();
        res.status(201).json({message:"Competition Updated Successfully"});
    } catch (error) {
        res.status(500).json({ error: 'Error updating competition' });
    }
});

// Delete a specific competition by ID
// Currently not using but leave here for further implementation
const deleteCompetition = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
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
        res.status(201).json({ message: 'Competition deleted successfully' });
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

