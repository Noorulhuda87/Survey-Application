import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import auth from '../lib/auth-helper';
import { getResponsesBySurveyId } from './api-response';
import { read } from './api-survey';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, RadioGroup, Radio, FormControl, FormControlLabel, Slider, TextareaAutosize, Button } from '@material-ui/core';
import ShortAnswerResponses from '../lib/ShortAnswerResponses';
import html2canvas from 'html2canvas'; 
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        textAlign: 'center',
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px ${theme.spacing(1)}px` ,
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    subtitle: {
        textAlign: 'center',
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
        fontSize: '1.1em'
    },
    questionText: {
        fontWeight: 'bold',
        marginTop: theme.spacing(2)
    },
    ratingResponses: {
        display: 'flex',
        marginBottom: theme.spacing(1),
    },
    ratingResponseCount: {
        marginLeft: theme.spacing(1)
    }
}))

function SurveyResponses() {
    const classes = useStyles();
    const { surveyId } = useParams();
    const jwt = auth.isAuthenticated()
    const [surveyData, setSurveyData] = useState({});
    const [responseData, setResponseData] = useState([]);

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        getResponsesBySurveyId({
            surveyId: surveyId
        }, {t: jwt.token}, signal).then((data) => {
            setResponseData(data)
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })

        read({surveyId: surveyId})
        .then((data) => {
            setSurveyData(data)
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        })

        return function cleanup(){
            abortController.abort()
        }
    },[])
    const getResponseCountForChoice = (choiceValue, questionId, index) => {
        let responseCount = 0;
        {responseData != null &&
            responseData.forEach(response => {
                if(response.answers.length > index
                   &&
                   response.answers[index].answer === choiceValue
                   &&
                   response.answers[index].question === questionId
                  )
                {
                    responseCount++
                }
            }); 
        } 
        return responseCount  
    }
    const getResponseCountForRating = (choiceValue, questionId, index) => {
        let responseCount = 0;
        {responseData != null && 
         responseData.forEach(response => {
             if(response.answers.length > index
                &&
                response.answers[index].answer == choiceValue
                &&
                response.answers[index].question === questionId)
             {
                 responseCount++;
             }
         })
        }
        return responseCount
    }
    const getShortAnswerResponses = (questionId, index) => {
        let shortAnswerResponses = [];
        {responseData != null &&
        responseData.forEach(response => {
            if(response.answers[index].question === questionId){
                shortAnswerResponses.push(response.answers[index].answer)
            }
        })}
        return shortAnswerResponses
    }
    const getResponseText = (count) => {
        return count === 1 ? 'response' : 'responses'
    }
    
 const generateReport = () => {
        let reportContent = `<h1>Survey Report <br/> ${surveyData.title}</h1><br/>`;

        reportContent += `<h2>Total Respondents: ${responseData.length}\n\n <h2>`;

        surveyData.questions.forEach((question, questionIndex) => {
            reportContent += `<h3>Question ${questionIndex + 1}: ${question.questionText}</h3>`;
    
            switch (question.questionType) {
                case 'multipleChoice':
                    question.choices.forEach((choice, choiceIndex) => {
                        const responseCount = getResponseCountForChoice(choice.value, question._id, questionIndex);
                        reportContent += `<p>${choice.value}: ${responseCount}/${responseData.length} = ${responseData.length !== 0 ? (getResponseCountForChoice(choice.value, question._id, questionIndex) / responseData.length * 100).toFixed(1) : '0'}%</p>`;
                    });
                    break;
                case 'rating':
                    for (let i = 1; i <= question.ratingScale; i++) {
                        const responseCount = getResponseCountForRating(i, question._id, questionIndex);
                        reportContent += `<p>Rating ${i}: ${responseCount}/${responseData.length} = ${responseData.length !== 0 ? (getResponseCountForRating(i, question._id, questionIndex) / responseData.length * 100).toFixed(1) : '0'}%</p>`;
                    }
                    break;
                case 'shortAnswer':
                    const shortAnswerResponses = getShortAnswerResponses(question._id, questionIndex);
                    if (shortAnswerResponses.length > 0) {
                        reportContent += '<p>Short answer responses:</p>';
                        shortAnswerResponses.forEach((response) => {
                            reportContent += `<p>${response}</p>`;
                        });
                    }
                    break;
                default:
                    break;
            }
    
            reportContent += '<br/>';
        });
    
         const printableWindow = window.open('', '_blank');
             if (printableWindow) {
                printableWindow.document.write(`
                               <html>
                                 <head>
                                    <title>Survey Report</title>
                                        <style>
                                             body {
                                                font-family: Arial, sans-serif;
                                                line-height: 1.6;
                                                margin: 20px;
                                                text-align: center;
                                                  }
                                             h1, h2 {
                                                margin-bottom: 5px;
                                                }
                                             p {
                                                margin-bottom: 3px;
                                               }
                                        </style>
                               </head>
                               <body>
                               ${reportContent}
                               <button onclick="downloadReport()">Download Report</button>
                               <script>
                                   function downloadReport() {
                                       const blob = new Blob([document.body.innerText], { type: 'text/plain' });
                                       const url = URL.createObjectURL(blob);
                                       const downloadLink = document.createElement('a');
                                       downloadLink.href = url;
                                       downloadLink.setAttribute('download', 'survey_report.txt');
                                       downloadLink.click();
                                   }
                               </script>
                           </body>
                            </html> `);
            printableWindow.document.close();
        } else {
            alert('Please allow pop-ups for printing');
        }
    };
    const handleExport = () => {
        generateReport();
    };
    
 
    return (
        <div>
            <Paper className={classes.root} elevation={4}> 
                <Typography type="title" className={classes.title}>
                    {surveyData.title} Responses
                </Typography>
                <Typography className={classes.subtitle}>{responseData && responseData.length} Total Respondents</Typography>
                {surveyData.questions && surveyData.questions.map((question, i) =>(
                    <span key={i}>
                        <Typography className={classes.questionText}>{question.questionText}</Typography>
                        {question.questionType === 'multipleChoice' && (
                            <>
                                {question.choices.map((choice, j) => (
                                    <span key={j}>
                                        <Typography>
                                            {choice.value}
                                            {': '}
                                            {getResponseCountForChoice(choice.value, question._id, i)}
                                            {'/'}
                                            {responseData.length}
                                            {' = '}
                                            {responseData.length !== 0 ? (getResponseCountForChoice(choice.value, question._id, i) / responseData.length * 100).toFixed(1) : '0'}
                                            {'%'}
                                        </Typography>
                                    </span>
                                ))}
                            </>
                        )}
                        {question.questionType === 'rating' && (                            
                            Array.from({ length: question.ratingScale }, (_, index) => (
                                <span className={classes.ratingResponses} key={index + 1}>                            
                                    <Typography className={classes.ratingResponseCount}>
                                        {'Rating '}
                                        {index + 1}
                                        {': '}
                                        {getResponseCountForRating(index + 1, question._id, i)}
                                        {'/'}
                                        {responseData.length}
                                        {' = '}
                                        {responseData.length !== 0 ? (getResponseCountForRating(index + 1, question._id, i) / responseData.length * 100).toFixed(1) : '0'}
                                        {'%'}
                                    </Typography>
                                </span>
                            ))
                        )}
                        {question.questionType === 'shortAnswer' && (
                            <>
                                <ShortAnswerResponses answers={getShortAnswerResponses(question._id, i)}/>
                            </>
                        )}
                        
                    </span>

                ))}
                <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', paddingTop: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleExport} >Export Report
                </Button>
                </div>
            </Paper>
        </div>
    )
 
                    }
export default SurveyResponses
