/*
  Author:  Noorulhuda Khamees  301291589
      

    File Description:

    This page contains a list of all active surveys. A user can click a survey to
    be directed to that survey's page to fill out the answers.
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listSurveys } from './api-survey'
import { Card, CardContent, Typography, TextField,
   Button, CardActions, Paper, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    textAlign: 'center',
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}))

function Surveys() {
  const classes = useStyles();
  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    
    listSurveys(signal)
    .then((data) => {
      console.log(data);
      setSurveys(data);
    })
    .catch((err) => {
      console.error(err);
    });

    return function cleanup(){
      abortController.abort()
    }
  }, [])
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type='title' className={classes.title}> All Active Surveys</Typography>
        <List>
          {surveys.map((survey, i) => (
            <span key={i}>
              {new Date(survey.startDate) < new Date() && new Date(survey.endDate) > new Date() && 
                <Link to={'/survey/' + survey._id} className={classes.link}>
                  <ListItem>
                    <ListItemText 
                    primary={survey.title}/>
                  </ListItem>
                </Link>
              }
            </span>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default Surveys
