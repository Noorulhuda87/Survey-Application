/*
    Project: Tech Titans Survey App
    Class: Comp229 Sec 402
    Authors: 
        Noorulhuda Khamees  301291589
        Ronald Hardock      301274360
        Amer Ajjawi         301319092
        Blake Hewitt        301279469
        Gabriel Normand     301293488
        Jordi Llobet Ferre  301261208

    File Description:

    This file contains the Response model schema for the MongoDB database.

*/

import mongoose from 'mongoose'

const ResponseSchema = new mongoose.Schema({
  survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  respondent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey.questions', required: true },
      answer: { type: String, required: true },
    }
  ],
});

export default  mongoose.model('Response', ResponseSchema);


