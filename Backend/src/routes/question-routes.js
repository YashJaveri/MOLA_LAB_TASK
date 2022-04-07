import { Router } from 'express';
import ErrorProtectedRoute from '../utils/error-protected-route.js';
import { ResponseData } from '../utils/response-data.js';
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import ApiError from '../utils/api-error.js';
import { TestModel } from '../models/test.js';


export const QuestionRoutes = Router()

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

QuestionRoutes.post('/', ErrorProtectedRoute( async (req, resp) => {
    XLSX.set_fs(fs);
    var workbook =  XLSX.readFile("mfq_question.xlsx")    
    var worksheet = workbook.Sheets[workbook.SheetNames[0]]
    var arr = Array.from({length: 37}, (_, i) => i + 2)
    var randomArr = getMultipleRandom(arr, 10)

    var questions = []
    for(let i=0;i<randomArr.length;i++){        
        let opt = ["Strongly Disagree", "Slightly Disagree", "Disagree", "Neutral", "Slightly Agree", "Agree", "Strongly Agree"]
        let x = {
            question: worksheet[`B${randomArr[i]}`].v,
            options: opt,
            answer: ""
        }
        questions.push(x)
    }
    const test = await TestModel.create({
        name: "YQuiz " + Date.now(),
        questions: questions
    })
    resp.status(200).send(new ResponseData(test))
}))

QuestionRoutes.post('/submit/:id', ErrorProtectedRoute( async (req, resp) => {
    try{        
        let test = await TestModel.findById(req.params.id)        
        test.questions = req.body.questions
        test.duration = test.startTime - Date.now()
        let updatedTest = await test.save()
        if(updatedTest !== undefined)
        {  
            resp.status(200).send(new ResponseData(updatedTest).toJSON())
        }
    }
    catch(err){
        console.log(err)
        throw new ApiError("unknown-error", err.message, 400)
    }
}))

QuestionRoutes.get('/:id', ErrorProtectedRoute( async (req, resp) => {
    try{        
        let test = await TestModel.findById(req.params.id)                
        if(test !== undefined)
        {  
            resp.status(200).send(new ResponseData(test).toJSON())
        }
    }
    catch(err){
        console.log(err)
        throw new ApiError("unknown-error", err.message, 400)
    }
}))