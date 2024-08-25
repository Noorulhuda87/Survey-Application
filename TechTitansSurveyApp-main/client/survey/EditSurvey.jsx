/*
    Authors: Noorulhuda Khamees  301291589
       
    File Description:

    This file contains the edit survey page.

*/

import React, {useEffect, useState} from 'react'
import auth from '../lib/auth-helper';
import {read} from './api-survey'
import { useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

export default function EditSurvey(props) {
    const [open, setOpen] = useState(false)

    const jwt = auth.isAuthenticated()

    const navigate = useNavigate();

    const editSurvey = async () => {
        try {
            const response = await read(
                { surveyId: props.survey._id },
                { t: jwt.token }
            );

            if (response.error) {
                console.log(response.error);
            } else {
                navigate('/createsurvey', { state: { surveyData: response } });
            }
        } catch (error) {
            console.error('Error fetching survey data:', error);
        }
    }

    return (<span>
                <IconButton aria-label="Edit" onClick={editSurvey} color="secondary">
                    <Edit/>
                </IconButton>
            </span>
           )
}

EditSurvey.propTypes = {
    survey: PropTypes.object.isRequired
}

