/*
    Author: Noorulhuda Khamees  – 301291589

    File Description:
    This file defines the main App component of the Survey App.
*/
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import MainRouter from '../MainRouter';
import theme from '../theme';
//import { hot } from 'react-hot-loader'

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </Router>
  );
};

export default App;
