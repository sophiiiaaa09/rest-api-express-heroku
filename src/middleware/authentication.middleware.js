const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.jwtAuth = (req,res,next) => {
    if(req.headers['authorization']) {
        try{
            let authorization = req.headers['authorization'].split(' ')
            if(authorization[0] !== 'Bearer') {
                return res.status(401).send()
            }else{
                req.jwt = jwt.verify(authorization[1],process.env.SECRET_JWT)
                
                return next()
            }
        } catch(err){
            return res.status(403).send
        }
    }else{
        return res.status(401).send()
    }
}