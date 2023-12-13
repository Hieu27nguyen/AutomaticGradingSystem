const Announcement = require('../models/Announcement')
const asyncHandler = require('express-async-handler')

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

//Get all announcements
// Full URI: http://localhost:port/announcement/
// Required field in rest url:
//      
const getAllAnnouncements = asyncHandler(async (req, res) => {
    try {
        // Get all announcements from MongoDB
        const announcements = await Announcement.find();
        
        // If no announcements 
        if (!announcements.length) {
            return res.status(404).json({ message: 'No announcements found' });
        }

        res.setHeader('allowedRoles', ['CONTESTANT', 'JUDGE', 'ADMIN']);
        res.status(200).json(announcements);
    } catch (error) {
        console.error('Error in getAllAnnouncements:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

// Getting specific announcements by username
// Full URI: http://localhost:port/announcement/username/:username
// Required field in rest url:
//      'username': username of the user publishing the announcement
const getAnnouncementsByUsername = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['CONTESTANT','JUDGE', 'ADMIN'])
    const username = req.params.username;
    try {
        // Get all announcement records from MongoDB
        const announcementRecords = await Announcement.find({ username }).select().lean()

        // If no records
        if (!announcementRecords?.length) {
            return res.status(404).json({ message: 'No announcement records found for the specified username' })
        }

        res.status(200).json(announcementRecords);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }

})

//Getting a specific announcement by id
// Full URI: http://localhost:port/announcement/id/:id
// Required field in url param:
//      'id': id of the record
const getAnnouncementsByID = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['CONTESTANT','JUDGE', 'ADMIN'])
    const id = req.params.id;
try {
    //Get announcement record from MongoDB
    const announcementRecords = await Announcement.find({ "_id": id })

       // If no records 
       if (!announcementRecords?.length) {
        return res.status(404).json({ message: `No announcement with the ${id} found` })
    }
    res.status(200).json(announcementRecords);
}
catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
})

// Create a new announcement
// Full URI: http://localhost:port/announcement/
// Required field in request body:
//      'username': username of the user given the announcement translation
//      'title': Title of the announcement
//      'announceInformation': The content of the announcement 
const createNewAnnouncement = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    // Check the user's role
    const userRole = await checkUserRole(req);
    if (userRole !== 'Authorized') {
        return res.status(403).json({ error: 'You are not authorized to create a new announcement' });
    }
    const { username, title, announceInformation } = req.body

    // Confirm data
    if (!username || !announceInformation || !title) {
        return res.status(400).json({ message: 'Missing required fields' })
    }

    const announcementObj = { username, title, announceInformation }

    // Create and store new announcement 
    const announcement = await Announcement.create(announcementObj)

    if (announcement) { //created 
        res.status(201).json({ message: `New announcement from the user ${username} created` })
    } else {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})
// Delete an announcement by ID
// Full URI: http://localhost:port/announcement
// Required field in url param:
//      'id': id of the record
const deleteAnnouncement = asyncHandler(async (req, res) => {
    res.setHeader('allowedRoles', ['JUDGE', 'ADMIN'])
    const id  = req.body.id;
    const userRole = await checkUserRole(req);
    if (userRole==='Contestant') {
        return res.status(403).json({message:'User is not authorized to delete announcement'})
    }
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Announcement ID Required' })
    }

    // Does the announcement exist to delete?
    const announcement = await Announcement.findById(id).exec()

    if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' })
    }
    const result = await announcement.deleteOne()
    const reply = `Announcement with ID ${result._id} has been deleted`

    res.status(201).json(reply)
})


module.exports = {
    getAllAnnouncements,
    getAnnouncementsByUsername,
    getAnnouncementsByID,
    createNewAnnouncement,
    deleteAnnouncement
}
