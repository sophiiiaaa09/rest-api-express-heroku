const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const {jwtAuth} = require('../middleware/authentication.middleware')
router.get('/',[
    jwtAuth
    ,(req,res) => {
    res.send('index of users')}
])


//url untuk daftar user url : http://localhost:3000/api/v1/endpoint
//endpoint = url yg ada di routes 
router.post('/',[userController.createUser])

router.get('/id/:id',[userController.getUserById])

router.post('/login',[userController.userLogin])

module.exports = router