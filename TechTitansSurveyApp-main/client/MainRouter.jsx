/*import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home' 
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './auth/Signin.jsx'
import Profile from './user/Profile.jsx'
import Switch from 'react'
import PrivateRoute from 'react'
import EditProfile from 'react'
import Menu from 'react'
const MainRouter = () => {
return ( <div> 
<Routes>
        <Route exact path="/" element={<Home />} /> 
                <Route path="/users" component={Users} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/user/:userId" component={Profile} />
                <Menu/>
     <Switch>

<PrivateRoute path="/user/edit/:userId" component={EditProfile}/> 
<Route path="/user/:userId" component={Profile}/>
</Switch>
        
        
</Routes>
</div> 
)
}
export default MainRouter*/

import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import React from 'react'
//import {Route, Routes} from 'react-router-dom'
import Home from './core/Home' 
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import Profile from './user/Profile.jsx'
import Switch from 'react'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import Menu from './core/Menu' 
import Surveys from './survey/Surveys.jsx';
import CreateSurvey from './survey/CreateSurvey.jsx';
import MySurveys from './survey/MySurveys.jsx';
import EditSurvey from './survey/EditSurvey.jsx';
import Survey from './survey/Survey.jsx';
import SurveyResponses from './survey/SurveyResponses.jsx';

function MainRouter() {
    return (
        <div>
            <Menu/>
             
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/survey/:surveyId" element={<Survey />} />
                <Route path="/responses/:surveyId" element={<SurveyResponses />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/user/:userId" element={<Profile />} />
                <Route path="/user/edit/:userId"
                       element={
                           <PrivateRoute>
                               <EditProfile />
                           </PrivateRoute>
                       }/>
                <Route path="/createsurvey" 
                       element={
                           <PrivateRoute>
                               <CreateSurvey />
                           </PrivateRoute>
                       } />
                <Route path="/mysurveys" 
                       element={
                           <PrivateRoute>
                               <MySurveys />
                           </PrivateRoute>
                       } />

                <Route path="/survey/edit/:surveyId"
                          element={
                            <PrivateRoute>
                                 <EditSurvey />
                            </PrivateRoute>
                          } />
                
            </Routes>
        </div>
    );
}

export default MainRouter;
