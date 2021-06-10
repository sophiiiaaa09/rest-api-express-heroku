const {validationResult} = require('express-validator') 
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

dotenv.config()

exports.userLogin = async (req,res,next) => {
    this.checkValidation(req)
    const {email,password: pass} = req.body

    const user = await userModel.findOne({email})

    if(!user) {
        res.status(401).send('User not found')
    }

    const isCompare = await bcrypt.compare(pass,user.password)

    if(!isCompare) {
        res.status(401).send('EMail / Password invalid!!')
    }

    const secretkey = process.env.SECRET_JWT || ""

    const token = jwt.sign({user_id : user.id.toString()}, secretkey, {
        expiresIn : '2h'
    })

    const {password, ...userWithoutPassword} = user

    res.send({...userWithoutPassword,token})
}

exports.getUserById = async (req,res) => {
	const user = await userModel.findOneById(req.params.id)
	if(!user) {
        	res.status(401).send('User not found')
    	}
	res.status(200).send(user)
}

exports.createUser = async (req,res,next) => {
    this.checkValidation(req)
    await this.hashPassword(req)

    const save = await userModel.create(req.body)
    if(!save){
        res.status(500).send('Something went wrong')
    }

    res.status(200).send('Registrasi Berhasil!')
}

exports.checkValidation = (req) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        throw new HttpException(400,'Validation Error',errors)
    }
}

exports.hashPassword = async (req) => {
    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password,8)
    }
}