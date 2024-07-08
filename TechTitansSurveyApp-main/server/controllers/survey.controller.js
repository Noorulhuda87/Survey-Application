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

	This file contains the controller functions for the survey model.

*/

import Survey from '../models/survey.model.js'
import errorHandler from './error.controller.js'

const createSurvey = async (req, res) => {
	try {
		// console.log('create survey')
		const survey = new Survey(req.body)
		survey.owner = req.profile
		await survey.save()
		res.status(200).json(survey)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

const getAllSurveys = async (req, res) => {
	try {
		// console.log('get all surveys')
		const surveys = await Survey.find()
		res.status(200).json(surveys)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

const surveyById = async (req, res, next, id) => {
	try {
		// console.log('get survey by id: ' + id)
		let survey = await Survey.findById(id).populate('owner', '_id name').exec()
		if (!survey) {
			return res.status(404).json({
				error: 'Survey not found'
			})
		}
		req.survey = survey
		next()
	} catch (error) {
		return res.status(400).json({
			error: 'Could not retrieve survey'
		})
	}
}

const listByOwner = async (req, res) => {
	// console.log('list by owner ' + req.profile._id)
	try {
		let surveys = await Survey.find({ owner: req.profile._id }).populate('owner', '_id name')
		res.json(surveys)
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			error: 'Could not retrieve survey'
		})
	}
}

const readSurvey = (req, res) => {
	// console.log('read survey')
	return res.json(req.survey)
}


const updateSurvey = async (req, res) => {
	try {
		// console.log('update survey')
		let survey = req.survey
		survey = Object.assign(survey, req.body)
		survey.updated = Date.now()
		await survey.save()
		res.status(200).json(survey)
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error)
		})
	}
}

const deleteSurvey = async (req, res) => {
	try {
		let survey = req.survey
		// console.log('delete survey by id: ' + survey._id)
		let deletedSurvey = await survey.deleteOne()
		res.status(200).json(deletedSurvey)
	} catch (error) {
		return res.status(400).json({
			error: "Delete survey failed"
		})
	}
}

const isOwner = (req, res, next) => {
	const isOwner = req.survey && req.auth && req.survey.owner._id == req.auth._id
	if (!isOwner) {
		return res.status(403).json({
			error: "User is not authorized"
		})
	}
	next()
}

export default {
	createSurvey,
	getAllSurveys,
	updateSurvey,
	deleteSurvey,
	isOwner,
	listByOwner,
	surveyById,
	readSurvey
}

