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
    This is the Private Route Component of the Survey App.

*/
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();
  
  return auth.isAuthenticated() ? (
    children
  ) : (
    <Navigate
      to="/signin"
      state={{ from: location }}
      replace
    />
  );
};

export default PrivateRoute;

// Usage example in your route configuration
// <PrivateRoute path="/protected">
//   <ProtectedComponent />
// </PrivateRoute>
