const {body} = require('express-validator')
const Role = require('../util/userRoles.utils')

exports.validateLogin = [
    body('email')
    .exists()
    .withMessage('Email harus diisi')
    .isEmail()
    .withMessage('Email tidak valid')
    .normalizeEmail(),
    body('password')
    .exists()
    .withMessage('Passwordnya mana')
    .notEmpty()
    .withMessage('Passowrdnya manaa')
]