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

    This code configures environmental variables that, among other things, allow access to our MongoDB database.

*/


const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI ||
        "mongodb+srv://rhardock:CmyTTbWOgbpUms6t@cluster0.ofdqr5o.mongodb.net/TechTitansSurveyApp?retryWrites=true&w=majority" ||
    process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' + 
        (process.env.MONGO_PORT || '27017') +
        '/mernproject' 
}

export default config
