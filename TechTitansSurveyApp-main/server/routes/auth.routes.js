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

    This code defines and exports a router for the auth controller using the express module.

*/

import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()


router.route('/auth/signin')
    .post(authCtrl.signin)

router.route('/auth/signout')
    .get(authCtrl.signout)

export default router