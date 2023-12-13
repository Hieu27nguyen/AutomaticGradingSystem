const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController'); 
const verifyJWT = require('../middleware/verifyJWT'); 
router.use(verifyJWT);
/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Get all competitions
 *     tags: [Competitions]
 *     description: Retrieve competition information from database.
 *     parameters:
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
 *               - name: 'Competition 1'
 *                 duration: 3
 *                 processTimeStart: '2023-12-31T23:59:59.999Z'
 *                 _id: '1234567890'
 *       404:
 *         description: No competitions hosted yet
 *         content:
 *           application/json:
 *             example:
 *               message: 'No competition hosted yet'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error fetching competitions'
 */
router.route('/').get(competitionController.getAllCompetitions)
/**
 * @swagger
 * /competitions:
 *   post:
 *     summary: Create a new competition
 *     tags: [Competitions]
 *     description: Create a new competition for contestants.
 *     parameters:
 *       - in: body
 *         name: Competition Information
 *         description: Competition data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               default: Puget Sound Coding Competition
 *             duration:
 *               type: number
 *               default: 2
 *             processTimeStart:
 *               type: string
 *               format: date-time
 *     responses:
 *       201:
 *         description: New competition created successfully
 *         headers:
 *           allowedRoles:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *               message: 'New contest created'
 *       403:
 *         description: User not authorized to create or modify a new competition
 *         content:
 *           application/json:
 *             example:
 *               error: 'You are not authorized to create or modify a new competition'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error creating competition'
 */
router.route('/').post(competitionController.createCompetition)
/**
 * @swagger
 * /competitions:
 *   patch:
 *     summary: Update the competition
 *     tags: [Competitions]
 *     description: Update the details of the competition .
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Competition data for update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             duration:
 *               type: number
 *             processTimeStart:
 *               type: string
 *               format: date-time
 *     responses:
 *       201:
 *         description: Competition updated successfully
 *         headers:
 *           allowedRoles:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *               message: 'Competition Updated Successfully'
 *       403:
 *         description: User not authorized to update this competition
 *         content:
 *           application/json:
 *             example:
 *               error: 'You are not authorized to update this competition'
 *       404:
 *         description: Competition not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Competition not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error updating competition'
 */
router.route('/').patch(competitionController.updateCompetition)
/**
 * @swagger
 * /competitions/{competitionId}:
 *   delete:
 *     summary: Delete a competition
 *     tags: [Competitions]
 *     description: Delete an existing competition.
 *     parameters:
 *       - in: path
 *         name: competitionId
 *         description: ID of the competition to be deleted
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Competition deleted successfully
 *         headers:
 *           allowedRoles:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *               message: 'Competition deleted successfully'
 *       403:
 *         description: User not authorized to delete this competition
 *         content:
 *           application/json:
 *             example:
 *               error: 'You are not authorized to delete this competition'
 *       404:
 *         description: Competition not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Competition not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error deleting competition'
 */
router.route('/').delete(competitionController.deleteCompetition)
module.exports = router;