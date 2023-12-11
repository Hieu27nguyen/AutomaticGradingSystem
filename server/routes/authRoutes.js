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

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router