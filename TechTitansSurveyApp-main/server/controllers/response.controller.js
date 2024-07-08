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

	This file contains the controller functions for the response model.

*/
import Response from "../models/response.model.js"
import errorHander from "./error.controller.js"

const createResponse = async (req, res) => {
    try{
        // console.log('create response')
        const response = new Response(req.body)
        await response.save()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllResponses = async (req, res) => {
    try{
        // console.log('get all responses')
        const responses = await Response.find()
        res.status(200).json(responses)
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
}

const getResponsesBySurveyId = async (req, res) => {
    try{
        // console.log('get responses by surveyId')
        const surveyId = req.params.surveyId
        const responses = await Response.find({ survey: surveyId })
        
        res.status(200).json(responses)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
}

export default {
    createResponse,
    getAllResponses,
    getResponsesBySurveyId
}
