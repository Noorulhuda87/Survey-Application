/*
    Author:  Noorulhuda Khamees  – 301291589
    

    File Description:
    This file defines functions to perform Response CRUD operations accessing the back end api endpoints of the Survey App.
*/

const createResponse = async(responses) => {
    try {
        let response = await fetch('/api/responses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responses)
        })
        return await response.json()
    } 
    catch (error) {
        console.log(error)
    }
}

const getResponsesBySurveyId = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/responses/' + params.surveyId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    }
    catch(err){
        console.log(err)
    }
}

export {
    createResponse,
    getResponsesBySurveyId}
