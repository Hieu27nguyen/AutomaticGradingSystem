const express = require('express')
const router = express.Router()
const announcementController = require('../controllers/announcementController')

const verifyJWT = require('../middleware/verifyJWT'); 
router.use(verifyJWT);

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get All Announcement
 *     tags: [Announcements]
 *     description: Retrieve all announcements from database
 *     responses:
 *       200:
 *         description: Successful response
 *         headers:
 *           allowedRoles:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *               announceInformation: 'Hello contestants. This is a reminder that our competition will take place on 24th Dec 2023 at UW-Tacoma'
 *               announcementTime: '2023-11-30T02:23:27.786Z'
 *               id: '6567f21fb5e4df19d80f8d7f'
 *               title: 'Competition Start Day Announcement!'
 *               username: 'adminTest01'
 *               _id: '6567f21fb5e4df19d80f8d7f'
 *       404:
 *         description: Error response
 *         content:
 *           application/json:
 *             example:
 *               message: 'No announcements found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 */
router.route('/').get(announcementController.getAllAnnouncements)

/**
 * @swagger
 * /announcement/id/{id}:
 *   get:
 *     summary: Get Announcement by ID
 *     tags: [Announcements]
 *     description: Retrieve an announcement by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the announcement to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         headers:
 *           allowedRoles:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *               - announceInformation: 'Hello contestants. This is a reminder that our competition will take place on 24th Dec 2023 at UW-Tacoma'
 *                 announcementTime: '2023-11-30T02:23:27.786Z'
 *                 id: '6567f21fb5e4df19d80f8d7f'
 *                 title: 'Competition Start Day Announcement!'
 *                 username: 'adminTest01'
 *                 _id: '6567f21fb5e4df19d80f8d7f'
 *       404:
 *         description: No announcement found
 *         content:
 *           application/json:
 *             example:
 *               message: 'No announcement with the {id} found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 */
router.route('/id/:id').get(announcementController.getAnnouncementsByID);

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create a New Announcement
 *     tags: [Announcements]
 *     description: Make a new announcement for contestants
 *     parameters:
 *       - in: body
 *         name: Request Body
 *         description: Announcement Content
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             title:
 *               type: string
 *             announceInformation:
 *               type: string
 *     responses:
 *       201:
 *         description: New announcement created successfully
 *         headers:
 *           allowedRoles:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *               message: 'New announcement from the user ${username} created'
 *       400:
 *         description: Invalid data or missing required fields
 *         content:
 *           application/json:
 *             example:
 *               message: 'Missing required fields'
 *       403:
 *         description: User not authorized to create a new announcement
 *         content:
 *           application/json:
 *             example:
 *               error: 'You are not authorized to create a new announcement'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 */
router.route('/').post(announcementController.createNewAnnouncement)
    

/**
 * @swagger
 * /announcement/username/{username}:
 *   get:
 *     summary: Get Announcements by Username
 *     tags: [Announcements]
 *     description: Retrieve announcements associated with a specific username.
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username to retrieve announcements from
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         headers:
 *           allowedRoles:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *               - announceInformation: 'Hello contestants. This is a reminder that our competition will take place on 24th Dec 2023 at UW-Tacoma'
 *                 announcementTime: '2023-11-30T02:23:27.786Z'
 *                 id: '6567f21fb5e4df19d80f8d7f'
 *                 title: 'Competition Start Day Announcement!'
 *                 username: 'adminTest01'
 *                 _id: '6567f21fb5e4df19d80f8d7f'
 *       404:
 *         description: No announcement records found
 *         content:
 *           application/json:
 *             example:
 *               message: 'No announcement records found for the specified username'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 */
router.route('/username/:username').get(announcementController.getAnnouncementsByUsername);

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete an Announcement
 *     tags: [Announcements]
 *     description: Delete an announcement by providing its ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 required: true
 *                 description: id of the announcement you want to delete.
 *     responses:
 *       201:
 *         description: Successful Deletion
 *         headers:
 *           allowedRoles:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *               message: 'Announcement with ID {announcement_id} has been deleted'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Announcement ID Required'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               message: 'User is not authorized to delete announcement'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Announcement not found'
 */
router.route('/:id').delete(announcementController.deleteAnnouncement);


module.exports = router