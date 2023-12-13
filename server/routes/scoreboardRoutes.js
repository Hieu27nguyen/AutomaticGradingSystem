const express = require('express')
const router = express.Router()
const scoreboardController = require('../controllers/scoreboardController')

/**
 * @swagger
 * /scoreboard:
 *   get:
 *     summary: Get all scoreboard data
 *     tags: [Scoreboard]
 *     description: |-
 *          **Description:**
 * 
 *              Retrieve all scoreboard data from database
 *     responses:
 *       200:
 *         description: |
 *              **Successful response**
 *         headers:
 *           allowedRoles:
 *             description: |
 *                  ['JUDGE', 'ADMIN', 'CONTESTANT']
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *         content:
 *           application/json:
 *             example:
 *             - currentRank: '1'
 *               scoreboard: [
 *                      {   
 *                       rank: '1',
 *                       _id: '6573b44ec1e02cf4c4b5a80e',
 *                       username: 'kokinh11',
 *                       problemSolved: '3',
 *                       totalScore: '108',
 *                       problemStatistic: [
 *                                  {
 *                                   problemID: '6567bbb8c512e9dc1517f99d',
 *                                   attempts: '1',
 *                                   penalty: '0',
 *                                   score: '6',
 *                                   accepted: 'true',
 *                                   _id: '6573b44ec1e02cf4c4b5a80f'
 *                                  },
 *                                  {
 *                                   problemID: '6567bbb8c512e9dc1517f99e',
 *                                   attempts: '0',
 *                                   penalty: '0',
 *                                   score: '0',
 *                                   accepted: 'false',
 *                                   _id: '6573b44ec1e02cf4c4b5a811'
 *                                  },
 *                                  {
 *                                   problemID: '64c9a0e87629aa226f045a86',
 *                                   attempts: '1',
 *                                   penalty: '0',
 *                                   score: '50',
 *                                   accepted: 'true',
 *                                   _id: '6573b44ec1e02cf4c4b5a812'
 *                                  },
 *                                  {
 *                                   problemID: '656584ad6ef030f2596f3aa6',
 *                                   attempts: '2',
 *                                   penalty: '0',
 *                                   score: '50',
 *                                   accepted: 'true',
 *                                   _id: '6573b44ec1e02cf4c4b5a813'
 *                                  },
 *                                  {
 *                                   problemID: '6567bbb8c512e9dc1517f19s',
 *                                   attempts: '5',
 *                                   penalty: '0',
 *                                   score: '0',
 *                                   accepted: 'false',
 *                                   _id: '6573b44ec1e02cf4c4b5b10f'
 *                                  }
 *                       ],
 *                       __v: '0'
 *                      }
 *               ]
 *       500:
 *         description: |
 *               **Internal Server Error**
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error when getting scoreboard. Please try again later'
 */
//For security purposes, Scoreboard only have 1 route to get the current scoreboard
router.route('/')
    .get(scoreboardController.getScoreboard)


module.exports = router
