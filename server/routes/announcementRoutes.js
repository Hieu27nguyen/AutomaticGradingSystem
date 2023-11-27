const express = require('express')
const router = express.Router()
const announcementController = require('../controllers/announcementController')

router.route('/')
    // Get all translation
    // Full URI: http://localhost:port/announcement/
    // Required field in request body:
    .get(announcementController.getAllAnnouncements)
    // Create a new announcement
    // Full URI: http://localhost:port/announcement/
    // Required field in request body:
    //      'username': username of the user given the announcement translation
    //      'announceInformation': The content of the announcement 
    .post(announcementController.createNewAnnouncement)
    
// Delete an announcement
// Full URI: http://localhost:port/announcement/:id
// Required field in url param:
//      'id': id of the record
router.route('/:id').delete(announcementController.deleteAnnouncement)

//Get announcement records by username
// Full URI: http://localhost:port/announcement/username/:username
// Required field in request body:
router.route('/username/:username').get(announcementController.getAnnouncementsByUsername);

//Get announcement records by id
// Full URI: http://localhost:port/announcement/id/:id
// Required field in request body:
router.route('/id/:id').get(announcementController.getAnnouncementsByID);

module.exports = router