const express = require('express')
const router = express.Router()
const problemControllers = require('../controllers/problemsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(problemControllers.getProblemById)
    .post(problemControllers.createProblem)
    .patch(problemControllers.updateProblem)
    .delete(problemControllers.deleteProblem)

module.exports = router
