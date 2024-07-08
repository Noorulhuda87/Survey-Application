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

    This code defines and exports a set of functions to perform authentication and authorization 
    for the User model using JSON Web Tokens.

*/

import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";
import config from './../../config/config.js'


const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        if (!user)
            return res.status(401).json({ error: "User not found." })
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password don't match." })
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret)
        res.cookie('t', token, { expire: new Date() + 9999 })
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in." })
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "Signed out."
    })
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
    // console.log(req.profile)
    // console.log(req.auth)
    const authorized = req.profile && req.auth
        && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized."
        })
    }
    next()
}

export default { signin, signout, requireSignin, hasAuthorization }
