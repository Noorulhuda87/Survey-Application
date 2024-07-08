/*
    Project: Tech Titans Survey App
    Class: Comp229 Sec 402
    Authors: 
        Noorulhuda Khamees  – 301291589
        Ronald Hardock      – 301274360
        Amer Ajjawi         – 301319092
        Blake Hewitt        – 301279469
        Gabriel Normand     – 301293488
        Jordi Llobet Ferre  – 301261208

    File Description:
    This file defines functions to perform Survey CRUD operations accessing the back end api endpoints of the Survey App.
*/
import auth from '../lib/auth-helper.js'
//GET all surveys
const listSurveys = async (signal) => {
    try {
        let response = await fetch('/api/surveys', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}


//POST (create) a survey
const createSurvey = async (survey) => {
    try {
        let response = await fetch('/api/surveys/by/' + auth.isAuthenticated().user._id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.isAuthenticated().token
            },
            body: JSON.stringify(survey)
        })
        return await response.json()
    }
    catch(err) {
        console.log(err)
    }
}

const listByOwner = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/surveys/by/'+params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}

const remove = async (params, credentials) => {
    try {
        // const url = '/api/surveys/' + params.surveyId;
        // console.log(url)
        let response = await fetch('/api/surveys/' + params.surveyId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        if (!response.ok) {
            // Handle non-OK responses
            console.error('Error deleting survey:', response.statusText);
            return null; // or handle the error as needed
        }
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

const read = async (params) => {
    try {
        // const url = '/api/surveys/' + params.surveyId;
        // console.log(url)
        let response = await fetch('/api/surveys/' + params.surveyId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    }catch(err) {
        console.log(err)
    }
}

const update = async (params, credentials, survey) => {
    try {
        let response = await fetch('/api/surveys/' + params.surveyId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(survey)
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

export {
    createSurvey,
    listSurveys,
    listByOwner,
    remove,
    read,
    update
}

