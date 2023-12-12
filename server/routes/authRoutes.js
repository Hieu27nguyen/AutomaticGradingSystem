const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user and get access token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: [] 
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
 *                 default: adminTest01
 *               password:
 *                 type: string
 *                 required: true
 *                 default: 123
 *     responses:
 *       200:
 *         description: Successful login, returns access token
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "manually_insert_token"
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 */
router.route('/')
    .post(loginLimiter, authController.login)

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Get an refresh access token if the existing credential stil valid. Full functionality is limited due to Swagger UI lacks proper support for cookies.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Successful login, returns access token
 *         content:
 *           application/json:
 *             example:
 *               accessToken: [Valid Refresh access token]
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized Cookie'
 *       403:
 *         description: No or Invalid cookies
 *         content:
 *           application/json:
 *             example:
 *               message: 'Forbidden'
 */
router.route('/refresh')
    .get(authController.refresh)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Help users logout of the system and clear the cookies. Full functionality is limited due to Swagger UI lacks proper support for cookies.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *     responses:
 *       200:
 *         description: Successful login, returns access token
 *         content:
 *           application/json:
 *             example:
 *               message: "Cookies cleared!"
 *       204:
 *         description: There is not cookies to clear
 */
router.route('/logout')
    .post(authController.logout)

module.exports = router