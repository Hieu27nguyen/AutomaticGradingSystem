const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController'); 
const verifyJWT = require('../middleware/verifyJWT'); 
router.use(verifyJWT);
router.route('/')
    .get(competitionController.getAllCompetitions)
    .post(competitionController.createCompetition)
    .patch(competitionController.updateCompetition)
    .delete(competitionController.deleteCompetition)
module.exports = router;