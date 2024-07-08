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

    This file contains the routes for the response controller.
    The routes are used to create and read responses.

*/
import express from 'express'
import responseController from '../controllers/response.controller.js'
import surveyController from '../controllers/survey.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router();

//Create a response
router.route('/api/responses')
    .post(responseController.createResponse)
    .get(responseController.getAllResponses);

router.route('/api/responses/:surveyId')
    .get(authCtrl.requireSignin, surveyController.isOwner, responseController.getResponsesBySurveyId);

router.param('surveyId', surveyController.surveyById)

export default router