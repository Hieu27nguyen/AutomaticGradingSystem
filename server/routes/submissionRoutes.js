const express = require('express')
const router = express.Router()
const submissionControllers = require('../controllers/submissionsController')

/**
 * @swagger
 * /submisions:
 *   get:
 *     summary: Get all submission records
 *     tags: [Submissions]
 *     description: |- 
 *             **Description:**
 * 
 *                 Get all submission records from the database.
 *     parameters:
 *     responses:
 *       200:
 *         description: |
 *              **Successful response**
 *         content:
 *           application/json:
 *             example:
 *             - _id: '6577baad6261457445406941'
 *               user: 'kokinh11'
 *               problem: '657547a23bb74cd60d3f4323'
 *               code: 'try:\n\tname = input()\n\tprint(\"hello world \" + name)\nexcept EOFError as e:\n\tprint(\"hello world\")'
 *               status: 'Accepted'
 *               language_id: 71
 *               score: 668.15
 *               timeSubmitted: '2023-12-12T01:43:09.000+00:00' 
 *               testResults: [
 *                      {   
 *                       stdout: 'No\n',
 *                       time: 0.014,
 *                       stderr: null,
 *                       _id: '6577baad6261457445406942'
 *                      },
 *                      {
 *                       stdout: 'Yes\n',
 *                       time: 0.014,
 *                       stderr: null,
 *                       _id: '6577baad6261457445406943'
 *                      }
 *               ]
 *               __v: 0
 *       404:
 *         description: |
 *              **No submssion records found**
 *         content:
 *           application/json:
 *             example:
 *               message: 'No submissions found'
 *       500:
 *         description: |
 *              **Internal Server Error**
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error fetching submissions' 
 */
router.route('/').get(submissionControllers.getAllSubmissions)


/**
 * @swagger
 * /submissions:
 *   post:
 *     summary: Create a New Submission
 *     tags: [Submissions]
 *     description: |- 
 *          **Description:**
 * 
 *              Add a new submission to the database.
 * 
 *           **Reminder:**
 * 
 *              Must host judgeO in order for a successful request 
 *              Make sure to format the code source correctly, like how you use in thunderclient
 *     parameters:
 *       - name: timesubmitted
 *         in: header
 *         type: string
 *         required: true
 *         description: |-
 *              Submit time, use competition date timezone when submit.
 * 
 *              _Example: 2023-12-12T01:43:09.000Z_
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 required: true
 *                 description: Username of the user requesting submission 
 *                 default: kokinh11
 *               problem:
 *                 type: string
 *                 description: Problem id
 *                 required: true
 *                 default: 657547a23bb74cd60d3f4323
 *               language_id:
 *                 type: number
 *                 description: Programming anguage ID 
 *                 required: true
 *                 default: 71
 *               code:
 *                 type: string
 *                 description: Code source for submission
 *                 required: true
 *                 default: | 
 *                          try:
 * 
 *                              name = input()
 *                              if name.lower() == "yes":
 *                                  print("Yes")
 *                              else:
 *                              print("No")
 *                          except EOFError as e:
 *                              print("hello world")
 *
 *     responses:
 *       201:
 *         description: |
 *              **Successful Request**
 *         content:
 *           application/json:
 *             example:
 *               message: 'Submission created successfully'
 *               status: 'Accepted'
 *               testResults: [
 *                     {
 *                      stdout: 'No\n',
 *                      time: '0.013',
 *                      stderr: null
 *                     },
 *                     {
 *                      stdout: 'Yes\n',
 *                      time: '0.013',
 *                      stderr: null
 *                     } 
 *               ] 
 *       401:
 *         description: |
 *                  **Invalid time submission**
 *         content:
 *           application/json:
 *             example:
 *               error: 'Competition has ended or not yet started'
 *       402:
 *         description: |
 *                  **Invalid problem id**
 *         content:
 *           application/json:
 *             example:
 *               error: 'Cannot find problem with the correct ID'
 *       404:
 *         description: |
 *                  **Invalid submission**
 *         content:
 *           application/json:
 *             example:
 *               error: 'Invalid submission data received'  
 *       500:
 *         description: |
 *                  **Internal Server Error**
 *         content:
 *           application/json:
 *             example:
 *               message: 'Competition has not been correctly configured'
 */
router.route('/').post(submissionControllers.createSubmission)

/**
 * @swagger
 * /submissions/languages:
 *   get:
 *     summary: Get all supported programming languages
 *     tags: [Submissions]
 *     description: |- 
 *          **Description:**
 * 
 *              Retrieve all supported progamming languages.
 * 
 *          **Reminder:**
 * 
 *              Must host judgeO in order for a successful request 
 *     responses:
 *       200:
 *         description: |
 *                  **Successful response**
 *         content:
 *           application/json:
 *             example:
 *               [
 *                {
 *                  id: 45,
 *                  name: 'Assembly (NASM 2.14.02)'
 *                },
 *                {
 *                  id: 46,
 *                  name: 'Bash (5.0.0)'
 *                },
 *                {
 *                  id: 47,
 *                  name: 'Basic (FBC 1.07.1)'
 *                },
 *                {
 *                  id: 75,
 *                  name: 'C (Clang 7.0.1)'
 *                },
 *                {
 *                  id: 76,
 *                  name: 'C++ (Clang 7.0.1)'
 *                },
 *                {
 *                  id: 48,
 *                  name: 'C (GCC 7.4.0)'
 *                },
 *                {
 *                  id: 52,
 *                  name: 'C++ (GCC 7.4.0)'
 *                },
 *                {
 *                  id: 49,
 *                  name: 'C (GCC 8.3.0)'
 *                },
 *                {
 *                  id: 53,
 *                  name: 'C++ (GCC 8.3.0)'
 *                },
 *                {
 *                  id: 50,
 *                  name: 'C (GCC 9.2.0)'
 *                },
 *                {
 *                  id: 54,
 *                  name: 'C++ (GCC 9.2.0)'
 *                },
 *                {
 *                  id: 86,
 *                  name: 'Clojure (1.10.1)'
 *                },
 *                {
 *                  id: 51,
 *                  name: 'C# (Mono 6.6.0.161)'
 *                },
 *                {
 *                  id: 77,
 *                  name: 'COBOL (GnuCOBOL 2.2)'
 *                },
 *                {
 *                  id: 55,
 *                  name: 'Common Lisp (SBCL 2.0.0)'
 *                },
 *                {
 *                  id: 56,
 *                  name: 'D (DMD 2.089.1)'
 *                },
 *                {
 *                  id: 57,
 *                  name: 'Elixir (1.9.4)'
 *                },
 *                {
 *                  id: 58,
 *                  name: 'Erlang (OTP 22.2)'
 *                },
 *                {
 *                  id: 44,
 *                  name: 'Executable'
 *                },
 *                {
 *                  id: 87,
 *                  name: 'F# (.NET Core SDK 3.1.202)'
 *                },
 *                {
 *                  id: 59,
 *                  name: 'Fortran (GFortran 9.2.0)'
 *                },
 *                {
 *                  id: 60,
 *                  name: 'Go (1.13.5)'
 *                },
 *                {
 *                  id: 88,
 *                  name: 'Groovy (3.0.3)'
 *                },
 *                {
 *                  id: 61,
 *                  name: 'Haskell (GHC 8.8.1)'
 *                },
 *                {
 *                  id: 62,
 *                  name: 'Java (OpenJDK 13.0.1)'
 *                },
 *                {
 *                  id: 63,
 *                  name: 'JavaScript (Node.js 12.14.0)'
 *                },
 *                {
 *                  id: 78,
 *                  name: 'Kotlin (1.3.70)'
 *                },
 *                {
 *                  id: 64,
 *                  name: 'Lua (5.3.5)'
 *                },
 *                {
 *                  id: 89,
 *                  name: 'Multi-file program'
 *                },
 *                {
 *                  id: 79,
 *                  name: 'Objective-C (Clang 7.0.1)'
 *                },
 *                {
 *                  id: 65,
 *                  name: 'OCaml (4.09.0)'
 *                },
 *                {
 *                  id: 66,
 *                  name: 'Octave (5.1.0)'
 *                },
 *                {
 *                  id: 67,
 *                  name: 'Pascal (FPC 3.0.4)'
 *                },
 *                {
 *                  id: 85,
 *                  name: 'Perl (5.28.1)'
 *                },
 *                {
 *                  id: 68,
 *                  name: 'PHP (7.4.1)'
 *                },
 *                {
 *                  id: 43,
 *                  name: 'Plain Text'
 *                },
 *                {
 *                  id: 69,
 *                  name: 'Prolog (GNU Prolog 1.4.5)'
 *                },
 *                {
 *                  id: 70,
 *                  name: 'Python (2.7.17)'
 *                },
 *                {
 *                  id: 71,
 *                  name: 'Python (3.8.1)'
 *                },
 *                {
 *                  id: 80,
 *                  name: 'R (4.0.0)'
 *                },
 *                {
 *                  id: 72,
 *                  name: 'Ruby (2.7.0)'
 *                },
 *                {
 *                  id: 73,
 *                  name: 'Rust (1.40.0)'
 *                },
 *                {
 *                  id: 81,
 *                  name: 'Scala (2.13.2)'
 *                },
 *                {
 *                  id: 82,
 *                  name: 'SQL (SQLite 3.27.2)'
 *                },
 *                {
 *                  id: 83,
 *                  name: 'Swift (5.2.3)'
 *                },
 *                {
 *                  id: 74,
 *                  name: 'TypeScript (3.7.4)'
 *                },
 *                {
 *                  id: 84,
 *                  name: 'Visual Basic.Net (vbnc 0.0.0.5943)'
 *                }
 *               ]
 *       500:
 *         description: |
 *                  **Internal Server Error**
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error connecting with judging server'
 */
// Define a new route to get supported languages
router.route('/languages').get(submissionControllers.getSupportedLanguage);

/**
 * @swagger
 * /submissions/username/{username}:
 *   get:
 *     summary: Get submission records by specificed username
 *     tags: [Submissions]
 *     description: |-
 *          **Description:**
 * 
 *              Get submission records by specificed username.     
 * 
 *     parameters:
 *       - in: path
 *         name: username
 *         default: kokinh11
 *         description: username of the submission record to retrieve
 *         required: true
 *         type: string 
 *     responses:
 *       200:
 *         description: |
 *                  **Successful response**
 *         content:
 *           application/json:
 *             example:
 *             - _id: '6577baad6261457445406941'
 *               user: 'kokinh11'
 *               problem: '657547a23bb74cd60d3f4323'
 *               code: 'try:\n\tname = input()\n\tprint(\"hello world \" + name)\nexcept EOFError as e:\n\tprint(\"hello world\")'
 *               status: 'Accepted'
 *               language_id: 71
 *               score: 668.15
 *               timeSubmitted: '2023-12-12T01:43:09.000+00:00' 
 *               testResults: [
 *                      {   
 *                       stdout: 'No\n',
 *                       time: 0.014,
 *                       stderr: null,
 *                       _id: '6577baad6261457445406942'
 *                      },
 *                      {
 *                       stdout: 'Yes\n',
 *                       time: 0.014,
 *                       stderr: null,
 *                       _id: '6577baad6261457445406943'
 *                      }
 *               ]
 *               __v: 0
 *       404:
 *         description: |
 *                  **No submssion records found by username**
 *         content:
 *           application/json:
 *             example:
 *               message: 'No submission records found matching with the username {username}'
 *       500:
 *         description: |
 *                  **Internal Server Error**
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error fetching submission by username' 
 */
//Get submission records by username
// Full URI: http://localhost:port/submissions/username/:username
// Required field in request body:
router.route('/username/:username').get(submissionControllers.getSubmissionByUsername);

/**
 * @swagger
 * /submissions/id/{id}:
 *   get:
 *     summary: Get submission records by specificed submission id
 *     tags: [Submissions]
 *     description: |-
 *          **Description:**
 * 
 *              Get submission records by specificed submission id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the translation record to retrieve
 *         required: true
 *         type: string
 *         default: 6577baad6261457445406941
 *     responses:
 *       200:
 *         description: |
 *                  **Successful response**
 *         content:
 *           application/json:
 *             example:
 *             - _id: '6577baad6261457445406941'
 *               user: 'kokinh11'
 *               problem: '657547a23bb74cd60d3f4323'
 *               code: 'try:\n    name = input()\n    if name.lower() == \"yes\":\n        print(\"Yes\")\n    else:\n        print(\"No\")\nexcept EOFError as e:\n    print(\"hello world\")'
 *               status: 'Accepted'
 *               language_id: 71
 *               score: 668.15
 *               timeSubmitted: '2023-12-12T01:43:09.000+00:00' 
 *               testResults: [
 *                      {   
 *                       stdout: 'No\n',
 *                       time: 0.014,
 *                       stderr: null,
 *                       _id: '6577baad6261457445406942'
 *                      },
 *                      {
 *                       stdout: 'Yes\n',
 *                       time: 0.014,
 *                       stderr: null,
 *                       _id: '6577baad6261457445406943'
 *                      }
 *               ]
 *               __v: 0
 *       404:
 *         description: |
 *                  **No submssion records found by username**
 *         content:
 *           application/json:
 *             example:
 *               message: 'No submission record found matching the id'
 *       500:
 *         description: |
 *                  **Internal Server Error**
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error fetching submission by id'
 */
//Get submission records by id
// Full URI: http://localhost:port/submissions/id/:id
// Required field in request body:
router.route('/id/:id').get(submissionControllers.getSubmissionByID);

module.exports = router