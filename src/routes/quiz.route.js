const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quiz.controller')
const {jwtAuth} = require('../middleware/authentication.middleware')

router.get('/',[
    jwtAuth,
    quizController.getAll  
])

router.post('/',[
    jwtAuth,
    quizController.createQuiz
])

router.get('/:token',[
    quizController.getByToken
])
router.get('/id/:id',[
    quizController.getById
])

module.exports = router