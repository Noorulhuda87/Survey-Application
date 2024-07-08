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
    This file defines the entry point where the component App containing all other components is rendered for the Survey App.
*/
import React from 'react'
import App from './App.jsx'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />)

