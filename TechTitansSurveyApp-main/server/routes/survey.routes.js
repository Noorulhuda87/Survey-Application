/*
    Project: Tech Titans Survey App
    Class: Comp229 Sec 402
    Authors: 
        Noorulhuda Khamees  301291589
        Ronald Hardock      301274360
        Amer Ajjawi         301319092
        Blake Hewitt        301279469
        Gabriel Normand     301293488
        Jordi Llobet Ferre  301261208

    File Description:

    This file contains the routes for the survey controller.
    The routes are used to create, read, update and delete surveys.

*/

import express from 'express'
import surveyController from '../controllers/survey.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router();

// Get all surveys
router.get('/api/surveys', surveyController.getAllSurveys);

// Get all surveys by a userId
router.route('/api/surveys/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, surveyController.createSurvey)
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, surveyController.listByOwner);

router.route('/api/surveys/:surveyId')
    .get(surveyController.readSurvey)
    .put(authCtrl.requireSignin, surveyController.isOwner, surveyController.updateSurvey)
    .delete(authCtrl.requireSignin, surveyController.isOwner, surveyController.deleteSurvey);

// Update a survey by ID
// router.patch('/api/surveys/:surveyId', surveyController.updateSurveyById);

router.param('userId', userCtrl.userById)
router.param('surveyId', surveyController.surveyById)

export default router
