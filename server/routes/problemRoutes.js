const express = require('express')
const router = express.Router()
const problemControllers = require('../controllers/problemsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

/**
 * @swagger
 * /problems:
 *   get:
 *     summary: Get All Problems
 *     tags: [Problems]
 *     description: Retrieve all problems from database
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               name: 'Two Sum'
 *               description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'
 *               id: '6555a6fd5815b4321180770c'
 *               test: [
 *                      {
 *                       input: [1,2,3],
 *                       output: "12"
 *                      }
 *                     ]
 *               _id: '6555a6fd5815b4321180770c'
 *       404:
 *         description: Error response
 *         content:
 *           application/json:
 *             example:
 *               message: 'No problems found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal Server Error'
 */
router.route('/').get(problemControllers.getAllProblems)

/**
 * @swagger
 * /problems:
 *   post:
 *     summary: Create a New Problem
 *     tags: [Problems]
 *     description: Add a new problem to the database
 *     parameters:
 *       - in: body
 *         name: Problem Details
 *         description: Problem Content
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             test:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   input:
 *                     type: string
 *                   output:
 *                     type: string
 *     responses:
 *       201:
 *         description: Successful Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'New problem created successfully'
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: 'You are not authorized to create a new problem'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error creating problem'
 */
router.route('/').post(problemControllers.createProblem)
/**
 * @swagger
 * /problems:
 *   patch:
 *     summary: Update a problem
 *     tags: [Problems]
 *     description: Update an existing problem for judges and admins.
 *     parameters:
 *       - in: body
 *         name: Problem Details
 *         description: Problem data for update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             test:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   input:
 *                     type: string
 *                   output:
 *                     type: string
 *     responses:
 *       200:
 *         description: Successful Request
 *         content:
 *           application/json:
 *             example:
 *              message: 'Problem updated successfully.'
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: 'You are not authorized to update this problem'
 *       404:
 *         description: Problem not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Problem not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error updating problem'
 */
router.route('/').patch(problemControllers.updateProblem)
/**
 * @swagger
 * /problems:
 *   delete:
 *     summary: Delete a problem
 *     tags: [Problems]
 *     description: Delete an existing problem from database.
 *     parameters:
 *       - in: body
 *         name: problemID
 *         description: Problem ID for deletion
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Problem deleted successfully'
 *       403:
 *         description: User not authorized to delete this problem
 *         content:
 *           application/json:
 *             example:
 *               error: 'You are not authorized to delete this problem'
 *       404:
 *         description: Problem not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Problem not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error deleting problem'
 */
router.route('/').delete(problemControllers.deleteProblem)

module.exports = router
