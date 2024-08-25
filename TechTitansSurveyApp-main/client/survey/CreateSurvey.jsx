/*
   
    Author: Noorulhuda Khamees  301291589
    

    File Description:

    This file contains the create survey page.

*/
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createSurvey, update } from './api-survey';
import auth from '../lib/auth-helper';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
        margin: '0 auto',
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    textField: {
        width: '100%',
        marginBottom: theme.spacing(3),
    },
    error: {
        color: 'red',
    },
    submit: {
        margin: '0 auto',
        marginBottom: theme.spacing(2),
    },
    title: {
        textAlign: 'center',
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px`,
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    subTitle: {
        fontWeight: 'bold'
    },
    select:{
        width: '100%'
    },
    textArea: {
        marginTop: theme.spacing(3),
        width: '100%'
    },
    ratingScale : {
        marginTop: theme.spacing(3)
    },
    createSurveyQuestion: {
        borderBottom: '4px solid #526071',
        marginBottom: theme.spacing(2)
    },
    datePickerDiv: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: theme.spacing(2)
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        width:'100%'
    },
    addQuestionBtn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    deleteQuestionBtn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        scale: '0.75'
    }
}));

function CreateSurvey() {
    const { surveyId } = useParams();
    const jwt = auth.isAuthenticated()
    const location = useLocation();
    const stateData = location.state && location.state.surveyData;
    const classes = useStyles();
    const [openDialog, setOpendialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleCloseDialog = () => {
        setOpendialog(false)
    }

    const initialQuestion = {
        questionType: '',
        questionText: '',
        choices: [],
        ratingScale: 0,
        answerMaxLength: 0
    }

    const [surveyData, setSurveyData] = useState({
        title: stateData && stateData.title ? stateData.title : '',
        questions: stateData && stateData.questions ? stateData.questions : [initialQuestion],
        startDate: stateData && stateData.startDate ? new Date(stateData.startDate) : new Date(),
        endDate: stateData && stateData.endDate ? new Date(stateData.endDate) : new Date()
    });

    const handleTitleChange = name => event => {
        setSurveyData({...surveyData, [name]: event.target.value})
    }

    const handleDateChange = (date, name) => {
        if(name === 'startDate'){
            setSurveyData({ ...surveyData, startDate: date })
        }
        if(name === 'endDate'){
            setSurveyData({ ...surveyData, endDate: date })
        }
    }

    const handleQuestionChange = (index, name, event) => {
        const newQuestions = [...surveyData.questions];
        if (!newQuestions[index]){
            newQuestions[index] = {...initialQuestion};
        }
        newQuestions[index][name] = event.target.value;

        if(newQuestions[index][name] === 'rating'){
            newQuestions[index].ratingScale = 10;
            newQuestions[index].answerMaxLength = 0;
        }
        if(newQuestions[index][name] === 'shortAnswer'){
            newQuestions[index].ratingScale = 0;
            newQuestions[index].answerMaxLength = 200;
        }
        if(newQuestions[index][name] === 'multipleChoice'){
            newQuestions[index].ratingScale = 0;
            newQuestions[index].answerMaxLength = 0;
        }
        setSurveyData({...surveyData, questions: newQuestions})
    }

    const handleResponseChange = (index, event) => {
        const newQuestions = [...surveyData.questions];

        if (newQuestions[index].questionType === 'multipleChoice'){
            newQuestions[index].choices = event.target.value.split('\n')
                .map((choice) => ({value: choice.trim() }));
        }
        if (newQuestions[index].questionType === 'rating'){
            newQuestions[index].ratingScale = event.target.value;
        }
        if (newQuestions[index].questionType === 'shortAnswer'){
            newQuestions[index].answerMaxLength = event.target.value;
        }
        setSurveyData({...surveyData, questions: newQuestions})
    }
    
    const addQuestion = () => {
        setSurveyData({
            ...surveyData, 
            questions: [...surveyData.questions, {...initialQuestion}],
        })
    };
    
    const deleteQuestion = (index) => {
        const newQuestions = [...surveyData.questions];
        newQuestions.splice(index, 1);
        setSurveyData({...surveyData, questions: newQuestions});
    };

    const resetForm = () => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        setSurveyData({
            title: '',
            questions: [initialQuestion],
            startDate: tomorrow,
            endDate: tomorrow
        })
    }

    const handleSubmit = () => {
        const isoFormattedSurveyData = {
            ...surveyData,
            startDate: surveyData.startDate.toISOString(),
            endDate: surveyData.endDate.toISOString(),
        };
        {!stateData &&        
            createSurvey(isoFormattedSurveyData).then((data) => {
                console.log(data);
                setDialogMessage('Survey successfully created.')
                setOpendialog(true)
            }).catch((err) => {
                console.log(err);
                setDialogMessage('An error occured while attempting to create your survey.')
                setOpendialog(true)
            })
        }
        {stateData && 
            update({surveyId: stateData._id},{t: jwt.token}, isoFormattedSurveyData).then((data) => {
                console.log(data)
                setDialogMessage('Survey successfully updated.')
                setOpendialog(true)
            }).catch((err) => {
                console.log(err)
                setDialogMessage('An error ocured while attempting to update your survey.')
                setOpendialog(true)
            })
        }

        // only reset the form if we are not editing an existing survey
        {!stateData && resetForm()}
    }

    const getChoices = (obj) => {
        // console.log(obj.choices);
        // walk the array of choices and make a string of the value of each choice
        let result = obj.choices.map((choice) => choice.value).join('\n');

        return result;
    };

    useEffect(() => {
        if (!stateData) {
            resetForm();
        }
    }, [stateData]);

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography type='title' className={classes.title}>
                        {stateData ? 'Edit Survey' : 'Create Survey'}
                    </Typography>

                    {stateData && new Date(stateData.startDate) < new Date() ? (
                        <Typography>You can not edit a survey that is already active or expired.</Typography>
                    ) : (
                    <>
                        <Typography className={classes.subTitle}>
                            Survey Title
                        </Typography>

                        <TextField
                            id='title'
                            label='Title'
                            className={classes.textField}
                            value={surveyData.title}
                            onChange={handleTitleChange('title')}
                        />
                        <div className={classes.datePickerDiv}>
                            <div>
                                <InputLabel htmlFor='startDatePicker'>Select a start date</InputLabel>
                                <DatePicker 
                                    selected={surveyData.startDate} 
                                    onChange={(date) => handleDateChange(date, 'startDate')}
                                    id='startDatePicker'
                                    className={classes.datePicker}
                                />  
                            </div>
                            <div>
                                <InputLabel htmlFor='endDatePicker'>Select an end date</InputLabel>
                                <DatePicker 
                                    selected={surveyData.endDate} 
                                    onChange={(date) => handleDateChange(date, 'endDate')}
                                    id='endDatePicker'
                                />  
                            </div>
                        </div>
                        <Typography className={classes.subTitle}>
                            Survey Questions
                        </Typography>

                        {surveyData.questions.map((question, index) => (
                            <div key={index} className={classes.createSurveyQuestion}>

                                <TextField
                                    id={`questionText-${index}`}
                                    label={`Question ${index+1}`}
                                    className={classes.textField}
                                    value={question.questionText}
                                    onChange={(event) => handleQuestionChange(index, 'questionText', event)}
                                />

                                <InputLabel id={`questionTypeLabel-${index}`}>Question Type</InputLabel>
                                <Select
                                    className={classes.select}
                                    labelId={`questionTypeLabel-${index}`}
                                    id={`questionType-${index}`}
                                    value={question.questionType}
                                    onChange={(event) => handleQuestionChange(index, 'questionType', event)}
                                >
                                    <MenuItem value={'multipleChoice'}>Multiple Choice</MenuItem>
                                    <MenuItem value={'rating'}>Rating</MenuItem>
                                    <MenuItem value={'shortAnswer'}>Short Answer</MenuItem>
                                </Select>
                                
                                {question.questionType === 'multipleChoice' && (
                                    <div>
                                        <TextareaAutosize 
                                            className={classes.textArea}
                                            maxRows={10}
                                            placeholder='Write each response on a new line.'
                                            onChange={(event) => handleResponseChange(index, event)}
                                            defaultValue={stateData && stateData.questions && stateData.questions[index] ? getChoices(stateData.questions[index]) : ''}
                                        /> 
                                    </div>

                                )}

                                {question.questionType === 'rating' && (
                                    <div className={classes.ratingScale}>
                                        <InputLabel htmlFor={`ratingScale-${index}`}>Rating out of: </InputLabel>
                                        <TextField
                                            id={`ratingScale-${index}`}
                                            type='number'
                                            value={question.ratingScale}
                                            onChange={(event) => handleResponseChange(index, event)}
                                        />
                                    </div>

                                )}

                                {question.questionType === 'shortAnswer' && (
                                    <div className={classes.ratingScale}>
                                        <InputLabel htmlFor={`answerMaxLength-${index}`}>Maximum characters in answer: </InputLabel>
                                        <TextField
                                            id={`answerMaxLength-${index}`}
                                            type='number'
                                            value={question.answerMaxLength}
                                            onChange={(event) => handleResponseChange(index, event)}
                                        />
                                    </div>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.deleteQuestionBtn}
                                    onClick={() => deleteQuestion(index)}
                                >
                                    Delete Question
                                </Button>
                            </div>
                        ))}
                    </>
                    )}
                </CardContent>
                <CardActions>
                    {stateData && new Date(stateData.startDate) < new Date() ? (
                        <></>
                    ) : (

                   
                    <div className={classes.cardActions}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={addQuestion}>
                            Add Question
                        </Button>
                        
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={handleSubmit}>
                            {stateData ? 'Update Survey' :'Submit Survey'}
                        </Button>
                    </div> 
                    )}
                </CardActions>
            </Card>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogMessage}
                    </DialogContentText>
                    <DialogActions>
                        <div className={classes.dialogActions}>
                            <Button onClick={handleCloseDialog} color="secondary" autoFocus="autoFocus">
                                Confirm
                            </Button>
                        </div>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateSurvey
