/*
    
    Authors: Noorulhuda Khamees  – 301291589


    File Description:
    This file defines the entry point where the component App containing all other components is rendered for the Survey App.
*/
import React from 'react'
import App from './App.jsx'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />)

