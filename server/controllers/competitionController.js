const Competition = require('../models/Competition');
const asyncHandler = require('express-async-handler');

const checkUserRole = asyncHandler(async (req) => {
    try {
        // If the user is found, retrieve the roles from the "roles" array
        const roles = req.roles.map(roles => roles.toLowerCase());
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
    // Check the user's role
    const userRole = await checkUserRole(req);
    if (userRole !== 'Authorized') {
        return res.status(403).json({ error: 'You are not authorized to create or modify a new competition' });
    }

    const { name, date, timeStarted, duration, paused, extended, pausedTime, extendedTime, judgeConfig } = req.body;

    let newDate = new Date(date);

    try {
        var hm = timeStarted;   // your input string
        var a = hm.split(':'); // split it at the colons
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var milisec = ((+a[0]) * 60 * 60 + (+a[1]) * 60) * 1000;
        newDate = new Date(newDate.getTime() + milisec);
    }
    catch (error) {
        console.log("Error", error.essage);
    }

    const newCompetition = await Competition.create({
        name,
        "date": date,
        timeStarted,
        "processTimeStart": newDate,
        duration,
        paused,
        extended,
        pausedTime,
        extendedTime,
        // judgeConfig,
    })
   

    if (newCompetition) { //created 
        res.status(201).json({ message: `New contest created` })
    } else {
        res.status(400).json({ message: 'Invalid contest data received' })
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

// Update a specific competition
// Update the first element in the database
const updateCompetition = asyncHandler(async (req, res) => {
    const { name, date, timeStarted, duration, paused, extended, memLimit, timeLimit, pausedTime, extendedTime, judgeConfig } = req.body;
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
        firstCompetition.date = date;
        firstCompetition.timeStarted = timeStarted;

        let newDate = new Date(date);

        try {
            var hm = timeStarted;   // your input string
            var a = hm.split(':'); // split it at the colons
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var milisec = ((+a[0]) * 60 * 60 + (+a[1]) * 60) * 1000;
            newDate = new Date(newDate.getTime() + milisec);
        }
        catch (error) {
            console.log("Error", error.essage);
        }
        firstCompetition.processTimeStart = newDate;
        firstCompetition.duration = duration;
        firstCompetition.paused = paused || false;
        firstCompetition.extended = extended || false;
        firstCompetition.memLimit = memLimit;
        firstCompetition.timeLimit = timeLimit;
        firstCompetition.pausedTime = pausedTime || null;
        firstCompetition.extendedTime = extendedTime || null;
        // firstCompetition.judgeConfig = judgeConfig;

        const updatedCompetition = await firstCompetition.save();
        res.json(updatedCompetition);
    } catch (error) {
        res.status(500).json({ error: 'Error updating competition' });
    }
});

// Delete a specific competition by ID
// Currently not using but leave here for further implementation
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

