const dotenv = require('dotenv')
const quizModel = require('../models/quiz.model')

dotenv.config()

exports.getAll = async (req,res,next) => {

    let quizzes = await quizModel.getAll()

    if(!quizzes.length){
        res.status(404).send('Not found')
    }

    res.status(200).send(quizzes)
    
}

exports.createQuiz = async (req,res,next) => {
    let save = await quizModel.create(req.body)

    if(!save) {
        res.status(500).send('something went wrong')
    }
    
    res.status(200).send('quiz saved!!')
}

exports.getByToken = async (req,res) => {
    let quiz = await quizModel.getByToken(req.params.token)
    if(!quiz.length){
        res.status(404).send('Not found')
    }

    res.status(200).send(quiz)
} 
exports.getById = async (req,res) => {
    let quiz = await quizModel.getById(req.params.id)
    if(!quiz.length){
        res.status(404).send('Not found')
    }

    res.status(200).send(quiz)
} 