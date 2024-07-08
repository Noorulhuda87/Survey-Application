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
    This is the Home Page of the Survey App.

*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import teamlogo from './../assets/images/teamlogo.png';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
   

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%'
    }
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.protectedTitle,
  },
  media: {
    minHeight: 400,
    [theme.breakpoints.down('sm')]: {
      minHeight: 200, // Adjust for smaller screens
    }
  },
  surveyBtnDiv: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Home(){ 
  const classes = useStyles()
  return (
  <Card className={classes.card}>
    <Typography variant="h6" className={`${classes.title} MuiTypography-alignCenter`}>Home Page</Typography>
    <CardMedia className={classes.media}
      image={teamlogo} title="Team Logo"/>
    <CardContent>
      <Typography component="p" className='MuiTypography-alignCenter'> 
      Welcome to the Survey Buddy home page.
      </Typography> 
      <div className={classes.surveyBtnDiv}>
      <Link to={"/surveys/"} >
        <Button variant='contained' color="secondary">
          Surveys
        </Button>
      </Link>
      </div>
    </CardContent>
    <CardContent>
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; {new Date().getFullYear()} Tech Titans Team. All rights reserved.
        </Typography>
      </CardContent>
  </Card> 
  )
}

/*const MyComponent = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Card Title
        </Typography>
        <CardMedia
          className={classes.media}
          image={unicornbikeImg}
          title="Unicorn Bike"
        />
        <Typography variant="body2" component="p">
          Card content goes here.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyComponent;*/

