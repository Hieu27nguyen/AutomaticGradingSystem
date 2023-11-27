const Announcement = require('../models/Announcement')
const asyncHandler = require('express-async-handler')

//Get all announcements
// Full URI: http://localhost:port/announcement/
// Required field in rest url:
//      
const getAllAnnouncements = asyncHandler(async (req, res) => {
    // Get all announcements from MongoDB
    const announcements = await Announcement.find()

    // If no announcements 
    if (!announcements?.length) {
        return res.status(200).json({ message: 'No announcements found' })
    }

    res.json(announcements)
})

// Getting specific announcements by username
// Full URI: http://localhost:port/announcement/username/:username
// Required field in rest url:
//      'username': username of the user publishing the announcement
const getAnnouncementsByUsername = asyncHandler(async (req, res) => {
    const username = req.params.username;

    //Get all translation records from MongoDB
    const announcementRecords = await Announcement.find({ username }).select().lean()

    // If no records 
    if (!announcementRecords?.length) {
        return res.status(200).json({ message: 'No announcement records found' })
    }

    res.status(200).json(announcementRecords);

})

//Getting a specific announcement by id
// Full URI: http://localhost:port/announcement/id/:id
// Required field in url param:
//      'id': id of the record
const getAnnouncementsByID = asyncHandler(async (req, res) => {
    const id = req.params.id;

    //Get announcement record from MongoDB
    const announcementRecords = await Announcement.find({ "_id": id })

    // If no records 
    if (!announcementRecords?.length) {
        return res.status(200).json({ message: `No announcement with the ${id} found` })
    }

    res.status(200).json(announcementRecords);
})

// Create a new announcement
// Full URI: http://localhost:port/announcement/
// Required field in request body:
//      'username': username of the user given the announcement translation
//      'announceInformation': The content of the announcement 
const createNewAnnouncement = asyncHandler(async (req, res) => {
    const { username, announceInformation } = req.body

    // Confirm data
    if (!username || !announceInformation) {
        return res.status(400).json({ message: 'Missing required fields' })
    }

    const announcementObj = { username, announceInformation }

    // Create and store new announcement 
    const announcement = await Announcement.create(announcementObj)

    if (announcement) { //created 
        res.status(201).json({ message: `New announcement from the user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

// Delete an announcement by ID
// Full URI: http://localhost:port/announcement/:id
// Required field in url param:
//      'id': id of the record
const deleteAnnouncement = asyncHandler(async (req, res) => {
    const id  = req.params.id;
    console.log("ID", id);
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Announcement ID Required' })
    }

    // Does the user exist to delete?
    const announcement = await Announcement.findById(id).exec()

    if (!announcement) {
        return res.status(400).json({ message: 'Announcement not found' })
    }

    const result = await announcement.deleteOne()

    const reply = `Announcement with ID ${result._id} has been deleted`

    res.json(reply)
})

module.exports = {
    getAllAnnouncements,
    getAnnouncementsByUsername,
    getAnnouncementsByID,
    createNewAnnouncement,
    deleteAnnouncement
}
