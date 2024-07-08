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

    This file contains the Survey model schema for the MongoDB database.

*/

import mongoose from 'mongoose'

const SurveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    state: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft' },
    questions: [
        {
            questionType: { type: String,
                            enum: ['multipleChoice', 'rating', 'shortAnswer'], required: true },
            questionText: { type: String, required: true },
            choices: {
                type: [
                    {
                        value: { type: String, required: true },
                        allowExtraInfo: { type: Boolean, default: false },
                    },
                ],
                required: function () { return this.questionType === 'multipleChoice'; },
            },
            
            ratingScale: { type: Number, required: function ()
                           { return this.questionType === 'rating'; } },
            answerMaxLength: { type: Number, required: function ()
                               { return this.questionType === 'shortAnswer'; } },
        }
    ],

    created: { type: Date, default: Date.now },
    updated: Date, 
    
    startDate: { type: Date, // required for published surveys
                 required: function () { return this.state === 'published'; } },
    endDate: { type: Date, // required for published surveys
                required: function () { return this.state === 'published'; } },
});

export default mongoose.model('Survey', SurveySchema);

