const express = require('express')
const router = express.Router()
const path = require('path')
/**
 * @swagger
 * tags:
 *  - name: Authentication
 *    description: IMPORTANT`:` Execute this API before testing others. The username and password are already defined. After successfully login, copy the access token and paste it in Authorize button before using other APIs. 
 *  - name: Announcements
 *    description: Annoucement Route
 */
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router