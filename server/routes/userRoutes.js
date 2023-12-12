const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - roles
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: the _id of the user
 *         username:
 *           type: string
 *           description: the user name of the user
 *         roles:
 *           type: Array
 *           description: The roles of this user
 *         password:
 *           type: string
 *           description: The encrypted password
 *       example:
 *         id: 1
 *         username: theJudge
 *         roles: [Judge]
 *         password: $2b$10$YDFbyT9uvl36oc8OdI1c5.NBsI71fI5yhV3eOXrbPP6wMQ4QVsySS
 */

/**
 * @swagger
 * /users:
 *  get:
 *     summary: Get All Users Including Administratives Roles.
 *     tags: [Users]
 *     description: Retrieve all users from the database, excludes the password.
 *     responses:
 *       200:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               _id: '6555a6fd5815b4321180770c'
 *               username: 'team06'
 *               roles: ["Contestant"]
 *       404:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Error response
 *         content:
 *           application/json:
 *             example:
 *               message: 'No users found'
 */
router.route('/').get(usersController.getAllUsers)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a New User.
 *     tags: [Users]
 *     description: Add a new user to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *                 default: API_Doc_Contestant
 *               password:
 *                 type: string
 *                 required: true
 *                 default: testPassword
 *               roles:
 *                 type: array
 *                 required: true
 *                 default: ['CONTESTANT']
 *     responses:
 *       201:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Successful Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'New user created successfully'
 *       400:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Invalid user data
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invalid user data received'
 *       409:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Username has already been taken.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Duplicate Username'
 */
router.route('/').post(usersController.createNewUser)

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Edit an existing User.
 *     tags: [Users]
 *     description: Edit an existing user information in the database
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
 *                 description: id of the username whose information we want to edit.
 *               username:
 *                 type: string
 *                 required: true
 *                 default: API_Doc_Contestant
 *               roles:
 *                 type: array
 *                 required: true
 *                 default: ['CONTESTANT']
 *     responses:
 *       201:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'CONTESTANT','JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Successful Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'User updated.'
 *       400:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'CONTESTANT','JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Data sent invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invalid Data'
 *       409:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'CONTESTANT','JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: The auditted username already been taken.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Username has already exist. Please choose another username!'
 */
router.route('/').patch(usersController.updateUser)

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete an existing User.
 *     tags: [Users]
 *     description: Delete an user from the database
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
 *                 description: id of the username whose information we want to delete.
 *     responses:
 *       201:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'CONTESTANT','JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Successful Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'User deleted'
 *       400:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'CONTESTANT','JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: User not found or already been deleted.
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not found'
 *       409:
 *         headers:
 *           allowedRoles:
 *            schema:
 *                type: string
 *                example: "'CONTESTANT','JUDGE','ADMIN'"
 *            description: The roles authorized to access this service.
 *         description: Missing required info
 *         content:
 *           application/json:
 *             example:
 *               message: 'User Id required'
 */
router.route('/').delete(usersController.deleteUser)

module.exports = router
