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

    This file contains the view all surveys by user page logic.

*/

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'
import {listByOwner} from './api-survey.js'
import auth from '../lib/auth-helper.js';
import DeleteSurvey from './DeleteSurvey'
import EditSurvey from './EditSurvey'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        textAlign: 'center',
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    addButton:{
        float:'right'
    },
    leftIcon: {
        marginRight: "8px"
    }
}))

const MySurveys = () => {
    const classes = useStyles();
    const [surveys, setSurveys] = useState([]);
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByOwner({
            userId: jwt.user._id
        }, {t: jwt.token}, signal).then((data) => {
            if (data.error) {
                setRedirectToSignin(true)
            } else {
                setSurveys(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, []);

    const removeSurvey = (survey) => {
        const updatedSurveys = [...surveys]
        const index = updatedSurveys.indexOf(survey)
        updatedSurveys.splice(index, 1)
        setSurveys(updatedSurveys)
    }

    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    Your Surveys
                </Typography>

                <List dense>
                    {surveys.map((survey, i) => (
                        <span key={i}>
                            <ListItem button>
                                <ListItemText primary={survey.title} />
                                <ListItemSecondaryAction>
                                    <Link to={"/responses/" + survey._id}>
                                        <Button aria-label="Responses" color="primary">
                                            View Responses
                                        </Button>
                                    </Link>
                                    <EditSurvey survey={survey} />
                                    <DeleteSurvey survey={survey} onRemove={removeSurvey}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </span>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default MySurveys;


